import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_DEV_MODE === 'true' ? process.env.VUE_APP_DEV_ENDPOINT : process.env.VUE_APP_ENPOINT; // http://localhost:5000';
// axios.defaults.baseURL = '/';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

router.beforeEach((to, from, next) => {
  // if (from.name === 'search home') {
  //   store.state.searchYpos = window.scrollY
  // }
  // if (to.name === 'search home' && store.state.viewingRestaurant) {
    // console.log('here')
    // next(`/search/restaurant/${store.state.resultShown[0].api}/${store.state.resultShown[0].id}`)
  // }
  // if (to.name === 'pihp') {
  //   next(`/home`)
  // }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
