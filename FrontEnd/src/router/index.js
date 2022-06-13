import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderView from '../components/Order/OrderView.vue'
import CartPage from '../components/Cart/CartPage.vue'
import ItemView from '../components/item/ItemView.vue'
import ItemsLayout from '../components/item/ItemsLayout.vue'
import MainPage from '../components/MainPage.vue'
import ErrorView from '../components/Error.vue'

// import { store } from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/order/:orderId',
    name: 'OrderView',
    component: OrderView
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/items',
    name: 'ItemsLayout',
    component: ItemsLayout
  },
  {
    path: '/view/:id',
    name: 'ItemView',
    component: ItemView,
    // children: [
    //   { path: ':pihpId', component: PihpRoom, name: 'pihp room' },
    //   { path: '', component: NoPihp, name: 'pihp' }
    // ]
  },
  {
    path: '/404',
    name: 'Error',
    component: ErrorView
  },
  {
    path: '*',
    name: 'error page',
    component: ErrorView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (JSON.stringify(to.params) !== JSON.stringify(from.params) || to.name === 'CartPage') {
      return { x: 0, y: 0 }
    } else if (JSON.stringify(to.query) !== JSON.stringify(from.query)) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  // scrollBehavior (to, from, savedPosition) {
  //   // if (to.name === 'search home') {
  //   //   return { x: 0, y: store.state.searchYpos }
  //   // } else return { x: 0, y: 0 }
  // }
})

export default router
