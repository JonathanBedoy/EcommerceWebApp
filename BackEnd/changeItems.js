const Datastore = require('nedb')
require('dotenv').config();

const db = {
  items: new Datastore({ filename: process.env.DATABASE_ITEMS_PATH, autoload: true }),
  orders: new Datastore({ filename: process.env.DATABASE_ORDERS_PATH, autoload: true }),
  discounts: new Datastore({ filename: process.env.DATABASE_DISCOUNTS_PATH, autoload: true })
}

// to change shipping you would have to, go to vue, then change the state shipping rate, 
// then on paypal.js you have to change it in the db and  




// let itemsToUpdate = [{ name: 'Diva' }, { name: 'Denise' }, { name: 'Irazu' }, { name: 'Lavish' }, { name: 'Luisa' }];
// { $or:  itemsToFind} , { $set:{"stock": newStock}}

// db.items.update({ $or:  itemsToUpdate}, { $set:{"salePrice": -1}},{ multi: true })

// Setting the value of a non-existing field in a subdocument by using the dot-notation
// db.items.update({}, { $set: { "category": 'Silk' } }, { multi: true }, function (doc) {
//   // Mars document now is { _id: 'id1', system: 'solar', inhabited: false
//   //                      , data: { satellites: 2, red: true }
//   //                      }
//   // Not that to set fields in subdocuments, you HAVE to use dot-notation
//   // Using object-notation will just replace the top-level field
//   console.log(doc)
// });

// db.items.find({}, function (err, docs) {
//   console.log(docs);
// });

// db.items.update({ name: 'Pixie' }, { $set:{"stock": 39}})
// db.items.update({ name: 'Denise' }, { $set:{"stock": 6}})
// db.items.update({ name: 'DramaQueen' }, { $set:{"stock": 23}})
// db.items.update({ name: 'Fatima' }, { $set:{"stock": 25}})
// db.items.update({ name: 'Luisa' }, { $set:{"stock": 14}})
// db.items.update({ name: 'Bae' }, { $set:{"stock": 26}})
// db.items.update({ name: 'Lavish' }, { $set:{"stock": 9}})
// db.items.update({ name: 'Loveable' }, { $set:{"stock": 31}})
// db.items.update({ name: 'Bella' }, { $set:{"stock": 25}})
// db.items.update({ name: 'Irazu' }, { $set:{"stock": 15}})
// db.items.update({ name: 'Valerie' }, { $set:{"stock": 33}})
// db.items.update({ name: 'Irresistable' }, { $set:{"stock": 26}})
// db.items.update({ name: 'Innocent' }, { $set:{"stock": 31}})
// db.items.update({ name: 'Maria' }, { $set:{"stock": 25}})
// db.items.update({ name: 'Chele' }, { $set:{"stock": 31}})
// db.items.update({ name: 'Passionate' }, { $set:{"stock": 25}})
// db.items.update({ name: 'Diva' }, { $set:{"stock": 16}})
// db.items.update({ name: 'Sassy' }, { $set:{"stock": 32}})



// https://github.com/louischatriot/nedb
let doc = {
  name: 'Aries',
  originalPrice: 11.99,
  stock: 45,
  salePrice: -1,
  pictures: ['https://i.imgur.com/3YFO49Bl.jpg', 'https://i.imgur.com/KMuQwrll.jpg', 'https://i.imgur.com/Xn36UPF.jpg'],
  category: 'Mink'
}

db.items.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
  console.log('has just been addded', newDoc)
});

// let itemsToFind = [{ name: 'Pixie' }, { name: 'Denise' }, { name: 'Irazu' }];
// db.items.find({ $or:  itemsToFind}, function (err, docs) {
//   console.log(docs)
//   // docs contains Earth and Mars
// });

// let 

// db.items.remove({ name: 'Pixie' }, {}, function (err, numRemoved) {
//   // numRemoved = 1
// });

// db.find({ "fruits.0": 'apples' }, function (err, docs) {
//   console.log(docs)
//   // docs is an array containing documents Mars, Earth, Jupiter
//   // If no document is found, docs is equal to []
// });

// db.insert(doc, function (err, newDoc) {   // Callback is optional
//   // newDoc is the newly inserted document, including its _id
//   // newDoc has no key called notToBeSaved since its value was undefined
//   console.log('has just been addded', newDoc)
// });