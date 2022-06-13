<template>
  <div class="mainBody">
    <NavBar/>
    <Banner class="pt-5" style="margin-top: 2.4em;" v-if="show"/>
    <QuickViewModal/>
    <transition name="fade" mode="out-in">
      <router-view class="pt-5 routeStyle" ></router-view>
    </transition>
      <Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import QuickViewModal from './components/item/QuickViewModal.vue'
import Banner from './components/Banner.vue'
import Footer from './components/Footer.vue'
import { mapMutations, mapActions } from 'vuex'
import axios from 'axios'

// import CartPage from './components/Cart/CartPage.vue'

export default {
  mounted () {
    // TODO: pass in the response to populate items in state vuex
    axios.get(`/items`)
        .then(response => {
          this.setItems(response.data)
          this.getItemsFromLocal()
          this.setFocusIDuseID(this.$route.params.id)
          // console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
  },
  name: 'App',
  components: {
    NavBar,
    QuickViewModal,
    Banner,
    Footer
    // CartPage
  },
  created () {
    console.log('Welcome to Nia Lashes By Denise!')
  },
  methods: {
    ...mapMutations([
      'setItems',
      'setFocusIDuseID'
    ]),
    ...mapActions([
      'getItemsFromLocal'
    ])
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave {}

.fade-leave-active {
  transition: opacity 0.5s ease;
  opacity: 0;
}

.mainBody {
  background-color: rgb(248, 227, 227);
  height: 100%;
  font-family: 'Baloo 2', cursive;
}
.routeStyle {
  min-height: 100%;
  margin-bottom: -5.5em;
}
.routeStyle:after {
  content: "";
  display: block;
}
.routeStyle:after {
  height: 5.5em; 
}
html, body {
    height: 100%;
  /* box-sizing: border-box; */
  background-color: rgb(248, 227, 227);
}

</style>
