<template>
  <div class="orderItem mb-2 mx-auto p-3" >
    <div class="row d-flex justify-content-center">
      <div class="col-2 pt-2 px-0">
        <img :src="orderDetails.cartItems[position].pictures[0]" class="d-block w-50" alt="...">
      </div>
      <div class="col-4 pt-2 cartItemName nameHover" @click="$router.push(`/view/${orderDetails.cartItems[position]._id}`)">
        {{orderDetails.cartItems[position].name}}
      </div>
      <div class="col-2 pt-2 cartItemName">
        <span class="pr-1" style="font-size: .7em;">qty. </span> {{orderDetails.cartItems[position].quantity}}
      </div>
      <div class="col-4 pt-2 d-flex cartItemName">
        ${{orderDetails.cartItems[position].salePrice !== -1 ? (orderDetails.cartItems[position].salePrice *orderDetails.cartItems[position].quantity).toFixed(2): (orderDetails.cartItems[position].originalPrice * orderDetails.cartItems[position].quantity).toFixed(2)}}
      </div>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  props: {
    position: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  created () {
    // console.log(this.orderDetails.cartItems[this.position]._id)
  },
  name: 'orderItem',
  components: {

  },
  computed: {
    ...mapState([
      'cartItems',
      'orderDetails'
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
.orderItem {
  transition:all .8s ease-out 0s
}
.orderItem {
  font-size: .7em;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 1.5em;
  color: rgba(0, 0, 0, 0.589);
}
.nameHover:hover {
  cursor: pointer;
}
.cartItemName {
  font-size: 80%;
  font-family: 'Baloo 2', cursive;
}

@media only screen and (max-width: 400px) {
  .cartItemName {
    /* background-color: lightblue; */
    font-size: 1em;
  }
}
</style>
