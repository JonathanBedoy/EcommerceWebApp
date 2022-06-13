import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import router from '../router'
// import axios from 'axios'
// import io from 'socket.io-client'

// import router from '../router/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: [],//[{ name: 'Pixie', originalPrice: 6.99, stock: 11, salePrice: 5, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 15654 }, { name: 'asd', originalPrice: 7.99, stock: 6, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 1 }, { name: 'qwe', originalPrice: 7.99, stock: 5, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 2 }, { name: 'Pixie', originalPrice: 7.99, stock: 31, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 3 }, { name: 'Pixie', originalPrice: 7.99, stock: 11, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 4 }, { name: 'Pixie', originalPrice: 7.99, stock: 12, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 5 }, { name: 'Pixie', originalPrice: 7.99, stock: 12, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 6 }, { name: 'Pixie', originalPrice: 7.99, stock: 12, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 7 }, { name: 'Pixie', originalPrice: 7.99, stock: 13, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 8 }, { name: 'Pixie', originalPrice: 7.99, stock: 41, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 9 }, { name: 'Pixie', originalPrice: 7.99, stock: 31, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 10 }, { name: 'Pixie', originalPrice: 7.99, stock: 12, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 11 }, { name: 'Pixie', originalPrice: 7.99, stock: 31, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 12 }, { name: 'Pixie', originalPrice: 7.99, stock: 12, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 13 }, { name: 'mnbn', originalPrice: 7.99, stock: 11, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 14 }, { name: 'zxcv', originalPrice: 7.99, stock: 15, salePrice: -1, pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'], id: 15 }],
    cartItems: [
    //   {
    //   name: 'Pixie',
    //   originalPrice: 7.99,
    //   stock: 12,
    //   quantity: 6,
    //   salePrice: 5,
    //   pictures: ['https://i.imgur.com/7OUsxs1l.jpg', 'https://i.imgur.com/mIxiypsl.jpg'],
    //   id: 0
    // }
  ],
    focusedItemViewID: -1,//15654, //malleable id, viewing item? its the item with this id... 
    promotionalShipping: {
      current: true,
      spendAmount: 30
    },
    shippingRate: 4,
    similarItems: [],
    quickViewId: -1,
    itemViewId: -1,
    orderDetails: -1,
    categorySelected: 'Mink'
  },
  getters: {
    filteredLayoutItemIndexes: (state) => {
      let filteredItems = []
      // console.log(state.categorySelected)
      state.items.forEach((item, index) => {
        // console.log(item, !item.category, state.categorySelected === 'silk')
        if ((state.categorySelected === item.category) || (!item.category && state.categorySelected === 'Silk')) {
          filteredItems.push(index)
        }
      })
      // console.log(filteredItems)
      // let i = state.items.findIndex(obj => obj.id === state.focusedItemViewID)
      // // console.log('focusedItemViewData', i)
      // if (i === -1) return i
      return filteredItems
    },
    //returns index of item, if -1 then item does not exist
    focusedItemViewData: (state) => {
      let i = state.items.findIndex(obj => obj.id === state.focusedItemViewID)
      // console.log('focusedItemViewData', i, state.items[i])
      if (i === -1) return i
      return state.items[i]
    },
    focusedItemViewIndex: (state) => {
      let i = state.items.findIndex(obj => obj.id === state.focusedItemViewID)
      return i
    },
    cartTotalObj: (state) => {
      // create object that will be returned
      let obj = {
        itemTotal: 0,
        itemNum: 0,
        discount: 0,
        shipping: state.shippingRate
      }
      // calculate total for each item in cart check if on sale and add difference to obj.discount
      let total = 0
      state.cartItems.forEach(item => {
        obj.itemNum += item.quantity
        let itemPrice
        if (item.salePrice === -1) {
          itemPrice = item.originalPrice
        } else {
          itemPrice = item.salePrice
          obj.discount += ((item.originalPrice - item.salePrice) * item.quantity)
          // console.log('Item Discounted: ', item.originalPrice, '-', item.salePrice, obj.discount)
        }
        total += (item.quantity * itemPrice)
      })
      //calculate shipping
      // if there is a promotional shipping available then compute eligibility here
      let shipping = state.shippingRate
      if (state.promotionalShipping.current) {
        if (total >= state.promotionalShipping.spendAmount) {
          shipping = 0
          obj.shipping = 0
          obj.discount += state.shippingRate
        }
      }
      obj.itemTotal = total
      total += shipping
      obj.total = total
      // console.log(obj)
      return obj
    },
    cartItemNum: (state) => {
      // console.log('length: ', state.cartItems.length)
      return state.cartItems.length
    },
    inCart: (state) => {
      let index = state.cartItems.findIndex((cartItem) => cartItem.id === state.focusedItemViewID)
      return index !== -1
    }
  },
  mutations: {
    setcategorySelected (state, { category }) {
      state.categorySelected = category
    },
    setFocusID (state, position) {
      // console.log('newFocusId', state.items[position].id)
      state.focusedItemViewID = state.items[position].id
    },
    setFocusIDuseID (state, id) {
      state.focusedItemViewID = id
      // console.log('focusID', state.focusedItemViewID)
    },
    updateQuantity (state, {index, quantity}) {
      // console.log('hello there', quantity)
      state.cartItems[index].quantity = quantity
    },
    updateLocalStorage (state) {
      localStorage.clear()
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    setCartItems (state, itemList) {
      state.cartItems = itemList
    },
    setItems (state, items) {
      let newItems = items.map( item => {
        item.id = item._id
        return item
      })
      state.items = newItems
    },
    setOrderDetailsMutation (state, order) {
      state.orderDetails = order
    }
 // calculates distance given 2 coordinates. Could be moved to components, TODO:
    // // https://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates
    // distanceCalculator (state, data) {
    //   let { lat1, lon1, lat2, lon2, unit } = data
    //   if ((lat1 === lat2) && (lon1 === lon2)) {
    //     data.distance = 0
    //   } else {
    //     let radlat1 = Math.PI * lat1 / 180
    //     let radlat2 = Math.PI * lat2 / 180
    //     let theta = lon1 - lon2
    //     let radtheta = Math.PI * theta / 180
    //     let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    //     if (dist > 1) {
    //       dist = 1
    //     }
    //     dist = Math.acos(dist)
    //     dist = dist * 180 / Math.PI
    //     dist = dist * 60 * 1.1515
    //     if (unit === 'K') { dist = dist * 1.609344 }
    //     if (unit === 'N') { dist = dist * 0.8684 }
    //     data.distance = dist
    //   }
    // }
  },
  actions: {
    changeQuantity ({ commit, state }, {id, quantity}) {
      quantity = parseInt(quantity, 10)
      let index = state.cartItems.findIndex((cartItem) => id === cartItem.id)
      let oldQuantity = state.cartItems[index].quantity
      // console.log("here")
      if (quantity < 0) {
        quantity = oldQuantity
      } else if (quantity > state.cartItems[index].stock) {
        quantity = state.cartItems[index].stock
      }
      if (quantity === 0) {
        commit('removeFromCart', id)
      } else {
        // console.log(quantity)
        commit('updateQuantity', {index, quantity})
      }
      commit('updateLocalStorage')
      
    },
    getItemsFromLocal ({ commit, getters, state }) {
      // WARNING WARNING TODO:::::::::
      // SETS state.focusedItemViewID AND DOES NOT RESET IT BACK TO WHAT IT WAS
      let items = localStorage.getItem('cartItems')
      items = JSON.parse(items)
      let noLongerAvailable = []
      let upToDateItems = items.map((item, index) => {
        state.focusedItemViewID = item.id
        if (getters.focusedItemViewData === -1 || getters.focusedItemViewData.stock === 0) {
          noLongerAvailable.push(index)
        } else {
          if (item.quantity > getters.focusedItemViewData.stock) {
            item.quantity = getters.focusedItemViewData.stock
          }
          item.stock = getters.focusedItemViewData.stock
          item.originalPrice = getters.focusedItemViewData.originalPrice
          item.salePrice = getters.focusedItemViewData.salePrice
        }
        return item
      })
      // console.log(state.focusedItemViewID)
      noLongerAvailable.forEach( pos => {
        upToDateItems.splice(pos, 1)
      })
      commit('setCartItems', upToDateItems)
    },
    addToCart ({state, commit}, itemData) {
      let exists = state.cartItems.findIndex( item => itemData.id === item.id)
      if (exists === -1) {
        state.cartItems.push(itemData)
      } else { // means item is already in cart so do nothing
        // state.cartItems[]
      }
      // itemData should be the whole item object along with quantity added
      commit('updateLocalStorage')
    },
    removeFromCart ({state, commit}, cartId) {
      let index = state.cartItems.findIndex((cartItem) => cartId === cartItem.id)
      if (index !== -1) {
        state.cartItems.splice(index, 1)
      }
      commit('updateLocalStorage')
    },
    postCheckout ({state}) {
      let postJson = state.cartItems.map( item => {
        return {
          id: item.id,
          quantity: item.quantity
        }
      })
      // console.log(postJson)
      let postItems = {
        items: postJson
      }
      axios.post('/checkout', postItems)
      .then(function (response) {
        window.location.href = response.data
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
    },
    setOrderDetails ({ commit, state }, order) {

      // console.log('orderDetails are here:', order)
      let total = 0, discount = 0, itemNum = 0
      order.cartItems.forEach(item => {
        itemNum += +item.quantity
        let itemPrice
        if (item.salePrice === -1) {
          itemPrice = +item.originalPrice
        } else {
          itemPrice = +item.salePrice
          discount += ((item.originalPrice - item.salePrice) * item.quantity)
          // console.log('Item Discounted: ', item.originalPrice, '-', item.salePrice, obj.discount)
        }
        total += (item.quantity * itemPrice)
      })


      let shipping = state.shippingRate
      if (state.promotionalShipping.current) {
        if (total >= state.promotionalShipping.spendAmount) {
          shipping = 0
          discount += state.shippingRate
        }
      }
      let itemTotal = total
      total += shipping

      order.totalObj = {
        itemTotal,
        total: order.totalAmount,
        itemNum,
        discount,
        shipping
      }


      commit('setOrderDetailsMutation', order)
      
    },
    mixSimilarItems ({state, getters}) {
      let array = [...state.items.keys()]
      let currentIndex = array.length-1, temporaryValue, randomIndex;
      // console.log(getters.focusedItemViewIndex)

      array.splice(getters.focusedItemViewIndex, 1)
      // console.log('possible Keys: ', array)
      // While there remain elements to shuffle...
      while (0 < currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      // console.log(array)
      state.similarItems = array
    }
  },
  modules: {
  }
})
