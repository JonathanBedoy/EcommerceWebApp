<template>
  <div class="cartMain" @click="$route.path === '/cart' ? true : $router.push('/cart')">
    <i class="fas fa-shopping-bag" style="font-size: 1.4rem;" ></i>
    <span class="pl-1" style="font-family: 'Baloo 2', cursive;font-size: 1rem;" v-if="cartItemNum >= 1"><b>{{cartItemNum}}</b></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  computed: {
    ...mapGetters([
      'cartItemNum'
    ])
  },
  data () {
    return {
      hovering: false

    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.cartMain:hover {
  cursor: pointer;
  color: rgb(228, 105, 123);
  transition:all .8s ease-out 0s
}
</style>
