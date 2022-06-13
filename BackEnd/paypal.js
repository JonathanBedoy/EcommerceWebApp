// import express from 'express'
const express = require('express')
const app = express();
const paypal = require('paypal-rest-sdk')
const body = require('body-parser')
const history = require('connect-history-api-fallback')
app.use(history());
app.use(express.static('public'));

const cors = require('cors')
app.use(cors())

app.use(body.urlencoded({extended: false}))
app.use(body.json())
require('dotenv').config();

paypal.configure({
  'mode': process.env.DEV_MODE === 'true' ? 'sandbox' : 'live', //sandbox or live
  'client_id': process.env.DEV_MODE === 'true' ? process.env.PAYPAL_CLIENT_ID_SANDBOX : process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.DEV_MODE === 'true' ? process.env.PAYPAL_SECRET_SANDBOX : process.env.PAYPAL_SECRET_ID,
});




const Datastore = require('nedb')

const db = {
  items: new Datastore({ filename: process.env.DATABASE_ITEMS_PATH, autoload: true }),
  orders: new Datastore({ filename: process.env.DATABASE_ORDERS_PATH, autoload: true }),
  discounts: new Datastore({ filename: process.env.DATABASE_DISCOUNTS_PATH, autoload: true })
}

app.post('/checkout', (req, res) => {
  // store the array of items
  const itemArr = req.body.items

  if (itemArr.length > 0) {
    generateOrder(itemArr, (reURL) => {
      res.send(reURL)
    })
  } else {
    res.redirect('/error')
  }
})

app.get('/order/:orderId', (req, res) => {
  const orderId = req.params.orderId
  db.orders.findOne({_id: orderId}, (err, orderDoc) => {
    // console.log(orderDoc)
    if (!orderDoc) {
      res.send({error: 'Order does not exist'})
    } else {
      if(!orderDoc.hasPaid) {
        const execute_payment_json = {
          'payer_id': req.query.PayerID,
          'transactions': [{
            'amount': {
              'currency': 'USD',
              'total': orderDoc.totalAmount // has to match the total from the '/checkout' process1
            }
          }]
        }
        const paymentId = req.query.paymentId
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
            res.send({error: 'Payment Failed'})
            console.log(error.response);
            // throw error;
          } else {
            // console.log(JSON.stringify(payment));
            orderDoc.cartItems.forEach( item => {
              // for each item that was purchased, remove the quantity from DB
              // first find it to get the current stock number, then - by 
              // quantity and update it
              db.items.findOne({_id: item._id}, (err, doc) => {
                let newStock = doc.stock - item.quantity
                db.items.update({_id: doc._id}, { $set:{"stock": newStock}})
              })
            })
            db.orders.update({_id: orderId}, { $set:{hasPaid: true}}, (newDoc) => {
              db.orders.update({_id: orderId}, { $set:{justPaid: true}},{returnUpdatedDocs: true}, (err, num, newerDoc) => {
                res.send(newerDoc)
              })
            })
            // res.send(JSON.stringify(payment))
            
          }
        });
      } else {
        orderDoc.justPaid = false
        console.log(orderDoc)
        res.send(orderDoc)
      }
    }
  })
});

// remove order from db then redirect to cart which should have the cartItems there
app.get('/cancelorder/:orderId', (req, res) => {
  db.orders.remove({ _id: req.params.orderId }, {}, function (err, numRemoved) {
    // numRemoved = 1
  });
  res.send('cancelled');
});

// items will get the items from nedb db and send the json over
app.get('/items', (req, res) => {
  db.items.find({}, function (err, docs) {
    console.log('sent item arr')
    // console.log(docs);
    res.send(docs);
  });
});

// cartItems is just itemId plus quantity
// generateOrder will format then insert order inside the DB
// it will also have a 'hasPaid' flag
generateOrder = (cartItems, cb) => {
  console.log('GeneratingOrder')
  // call getCartItemsWithId that formats the data with the most current itemData
  getCartItemsWithId(cartItems, (err, formattedItems) => {
    // data is formatted now add hasPaid flag and then insert into DB
    let collectionData = {
      cartItems: formattedItems,
      hasPaid: false,
      justPaid: false
    }
    // insert to DB, then pass the id number
    db.orders.insert(collectionData, function (err, newDoc) {   
      console.log('has just been addded', newDoc._id)
      
      // formats the cartItems from DB or client into JSON for paypal
      formatToPaypalTransaction(formattedItems, newDoc._id, (payJSON) => {
        db.orders.update({_id: newDoc._id}, { $set:{"totalAmount": payJSON.transactions[0].amount.total}})
        // begin the paypal process here
        // basically tell paypal about the order, 
        // then get their response and tell client to redirect to that URL
        paypal.payment.create(payJSON, function(err, payment){
          if(err){
              console.error(err.response.details);
          } else {
              //capture HATEOAS links
              let links = [];
              payment.links.forEach(function(linkObj){
                  links[linkObj.rel] = {
                      'href': linkObj.href,
                      'method': linkObj.method
                  };
              })
              //if redirect url present, redirect user
              if (links.hasOwnProperty('approval_url')){
                // callback
                  cb(links['approval_url'].href)
                  // res.redirect(links['approval_url'].href);
              } else {
                  console.error('no redirect URI present');
              }
          }
        });
      })
    });
  })
}

// formats cartItems with most upto date item values
getCartItemsWithId = (cartItems, cb) => {
  // make a list of ids to get from db
  let findItems = cartItems.map(item => {
    return {_id: item.id}
  });
  // use list above to pull their data from DB
  db.items.find({ $or:  findItems}, function (err, docs) {
    let outOfStockItems = []
    // format all items check to see if there is stock available
    // they can order max = stock
    // if stock is 0 then they cannot purchase at all
    let formattedCartItems = docs.map( (item, index) => {
      let tempCartItem = cartItems.find(matchingItem => matchingItem.id === item._id)
      if (item.stock >= tempCartItem.quantity) {
        item.quantity = tempCartItem.quantity
      } else if (item.stock > 0) {
        item.quantity = item.stock
      } else {
        outOfStockItems.push(index)
      }
      return item
    });
    // if out of stock then remove from item list
    outOfStockItems.forEach(index => {
      formattedCartItems.splice(index, 1)
    })
    cb(false, formattedCartItems)
  });
}


formatToPaypalTransaction = (cartItems, orderId, cb) => {
  let payReq = {
    'intent':'sale',
    'redirect_urls':{ 
        'return_url':`https://nialashesbydenise.com/order/${orderId}`,
        'cancel_url':`https://nialashesbydenise.com/order/${orderId}?cancel=true`
    },
    'payer':{
        'payment_method':'paypal'
    },
    transactions: [
      {
        "amount": {
          "total": "31.11", // adds everything below and has to match up
          "currency": "USD",
          "details": {
            "subtotal": "30.00"
          }
        },
        "description": "Nia Lashes by Denise",
        // "custom": "EBAY_EMS_90048630024435",
        "invoice_number": orderId,
        "payment_options": {
          "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
        },
        "soft_descriptor": "ECHI5786786",
        item_list: {
          items: [

          ]
        }
      }
    ]
  }
  let totalAmount = 0
  payReq.transactions[0].item_list.items = cartItems.map((item) => {
    itemPrice = item.salePrice === -1 ? item.originalPrice: item.salePrice
    totalAmount += (itemPrice * item.quantity)
    totalAmount = +totalAmount.toFixed(2)
    return {
      'name': item.name,
      'quantity': item.quantity,
      'description': 'Lash from Nia Lashes by Denise',
      'price': itemPrice,
      'currency': 'USD'
      // 'sku': item._id
    }
  })
  
  
  
  db.discounts.find({$and: [{active: true}, {discountLabel: 'freeShippingMinimum'}]}, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      if (doc.length !== 0) {
        if(totalAmount < doc[0].maxSpent) {
          payReq.transactions[0].item_list.items.push({
            'name': 'Shipping',
            'quantity': 1,
            'currency': 'USD',
            'price': process.env.CURRENTSHIPPINGPRICE
          })
          totalAmount += +process.env.CURRENTSHIPPINGPRICE
          totalAmount = +totalAmount.toFixed(2)
        }
      }
      // console.log(payReq.transactions[0].item_list.items)
      // console.log(totalAmount)
      payReq.transactions[0].amount.total = totalAmount
      payReq.transactions[0].amount.details.subtotal = totalAmount
      cb(payReq)
    }
  })
}

// Prints a log once the server starts listening
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/items`);
});
