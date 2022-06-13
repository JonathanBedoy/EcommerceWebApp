<template>
<div>
  <div class="container" style="margin-top: 4.4em;">
  <div class="cartMain row" v-if="cartTotalObj.itemNum !== 0">
    <div class="col-md-7 col-lg-7 col-sm-12">
      <CartItem class="mb-3" style="" v-for="(item, index) in cartItems" :key="index" :position="index"/>
    </div>
    <CartTotal/>
    
  </div>
  <div class="mx-auto text-center emptyText" v-else>
    <span> No items in your cart. </span>
    <div class="mx-auto startShoppingBtn" @click="$router.push('/')"> Start Shopping </div>
  </div>

</div>
</div>

</template>

<script>
import CartItem from './CartItem.vue'
import CartTotal from './CartTotal.vue'
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'cart',
  components: {
    CartItem,
    CartTotal,
  },
  computed: {
    ...mapState([
      'cartItems',
    ]),
    ...mapGetters([
      'focusedItemViewData',
      'cartTotalObj'
    ])
  },
  data () {
    return {
      hovering: false,
      cartNum: 6

    }
  },
  methods: {
    ...mapMutations([
      'setFocusID'
    ]),
  }
}
</script>

<style scoped>
.cartMain {
  transition:all .8s ease-out 0s
}
.emptyText {
  /* background-color: white; */
  width: 50%;
  margin-top: 10%;
  padding-top: 15%;
  padding-bottom: 15%;
  font-size: 1.5em;
  color: rgba(0, 0, 0, 0.589);
}
.startShoppingBtn {
  border: 1px solid rgba(0, 0, 0, 0.589);
  background-color: rgb(255, 116, 137);
  max-width: 10em;
  margin-top: 5%;
  padding: 3%;
  font-size: 1em;
  color: rgba(0, 0, 0, 0.589);
  cursor: pointer;
}
.startShoppingBtn:hover {
  background-color: rgb(151, 151, 151);
  color: white;
  transition: 1s;
}
</style>
