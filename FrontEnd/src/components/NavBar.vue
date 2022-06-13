<template>
  <div>
    <div class="promoAdvert text-center fixed-top" style="background-color: rgb(248, 227, 227); height: 1.3em;" v-if="$route.path === '/cart' && promotionalShipping.current">
      <b>Free Shipping on orders over ${{promotionalShipping.spendAmount}}!</b>
    </div>
    <nav class="navbar navbar-light bg-light mainNav fixed-top" :style="{'margin-top': $route.path === '/cart' && promotionalShipping.current ? '1.3em' : '0'}">
      <div class="container">
        <a class="navbar-brand" @click="$route.path === '/' ? true : $router.push('/')">
          <img src="../assets/niaLogo.png" width="auto" height="60" alt="">
        </a>
        <Cart/>
      </div>
    </nav>
  </div>
  
</template>

<script>
import Cart from './Cart/Cart.vue'
import { mapState } from 'vuex'

export default {
  name: 'navigationBar',
  components: {
    Cart
  },
  computed: {
    ...mapState([
      'promotionalShipping'
    ])
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.mainNav {
  background-color: rgb(255, 255, 255) !important;
  box-shadow: 0 .05em .1em 0 rgba(0, 0, 0, 0.2), 0 .1em .2em 0 rgba(190, 167, 167, 0.19);
}
a:hover {
  cursor: pointer;
}

</style>
