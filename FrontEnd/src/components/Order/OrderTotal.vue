<template>
  <div class="col-sm-12 col-md-5 col-lg-4 totalMain mb-3" style="" v-if="orderDetails !== -1">
    <div class="row totalDesc">
      <div class="col-6 text-left px-4">
        <span>Items ({{orderDetails.totalObj.itemNum}}): </span>
      </div>
      <div class="col-6 text-right">
        <span>${{orderDetails.totalObj.itemTotal.toFixed(2)}}</span>
      </div>
    </div>
    <div class="row totalDesc">
      <div class="col-6 text-left px-4">
        <span>Shipping: </span>
      </div>
      <div class="col-6 text-right">
        <span>${{orderDetails.totalObj.shipping.toFixed(2)}}</span>
      </div>
    </div>
    <div class="row totalDesc discountText">
      <div class="col-6 text-left px-4">
        <span>Discount <b-icon icon="question-circle-fill" font-scale="0.8" color="black" v-b-tooltip.hover title="Total money saved."></b-icon> : </span>
      </div>
      <div class="col-6 text-right">
        <span>-${{orderDetails.totalObj.discount.toFixed(2)}}</span>
      </div>
    </div>
    <hr>
    <div class="row totalText ">
      <div class="col-6 text-left px-4 " >
        <span>Total: </span>
      </div>
      <div class="col-6 text-right">
        <span>${{orderDetails.totalObj.total.toFixed(2)}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'cart',
  components: {

  },
  computed: {
    ...mapState([
      'cartItems',
      'orderDetails',
      'promotionalShipping',
      'shippingRate'
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
      'setFocusID',
      'setOrderDetails'
    ]),
  }
}
</script>

<style scoped>
.totalMain {
  /* background-color: yellow; */
  background-color: white;
  border: 1px solid #ddd;
  word-wrap:break-word;
  /* height: 15.5em; */
  /* margin: 0 !important; */
  /* height: 50px; */
  transition:all .8s ease-out 0s
}
.totalText {
  font-size: 1.5em;
  font-family: 'Baloo 2', cursive;
}
.totalDesc {
  font-size: 1.02em;
}
.discountText {
  color: rgb(226, 97, 97);
}
@media only screen and (max-width: 576px) {
  .totalMain {
    /* background-color: lightblue; */
  }
}
@media only screen and (min-width: 576px) {
  .totalMain {
    /* background-color: grey; */
    margin: 0 !important;
  }
}
@media only screen and (min-width: 768px) {
  .totalMain {
    /* background-color: yellow; */
    margin: 0 !important;
  }
}
@media only screen and (min-width: 992px) {
  .totalMain {
    background-color: white;
    margin: 0 !important;
  }
}

</style>
