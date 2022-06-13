<template>
  <div class="col-sm-12 col-md-5 col-lg-4 totalMain mx-3 mb-3" style="">
    <div v-if="!orderInProcess">
      <div class="row">
        <div class="col-12 text-center mt-2 py-3 mb-2" >
          <div class="checkoutBtn" @click="orderInProcess = true; postCheckout();"><img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="paypal checkout button"></div>
        </div>
      </div>
      <div class="row totalDesc">
        <div class="col-6 text-left px-4">
          <span>Items ({{cartTotalObj.itemNum}}): </span>
        </div>
        <div class="col-6 text-right">
          <span>${{cartTotalObj.itemTotal.toFixed(2)}}</span>
        </div>
      </div>
      <div class="row totalDesc">
        <div class="col-6 text-left px-4">
          <span>Shipping: </span>
        </div>
        <div class="col-6 text-right">
          <span>${{cartTotalObj.shipping.toFixed(2)}}</span>
        </div>
      </div>
      <div class="row totalDesc discountText">
        <div class="col-6 text-left px-4">
          <span >Discounts <b-icon icon="question-circle-fill" font-scale="0.8" color="black" v-b-tooltip.hover title="Total money saved."></b-icon> : </span>
        </div>
        <div class="col-6 text-right">
          <span>-${{cartTotalObj.discount.toFixed(2)}}</span>
        </div>
      </div>
      <hr>
      <div class="row totalText">
        <div class="col-6 text-left px-4 " >
          <span>Total: </span>
        </div>
        <div class="col-6 text-right">
          <span>${{cartTotalObj.total.toFixed(2)}}</span>
        </div>
      </div>
    </div>
    <div  v-else>
      <b-spinner class="mx-auto d-flex justify-conent-center mt-5" type="grow" label="Loading..."></b-spinner>
      <div class="text-center"><b>Redirecting to Paypal...</b></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'cartTotal',
  components: {
    
  },
  computed: {
    ...mapGetters([
      'cartTotalObj'
    ])
  },
  data () {
    return {
      hovering: false,
      cartNum: 6,
      discount: 3.00,
      shipping: 3.00,
      total: 16.98,
      itemTotal: 13.98,
      orderInProcess: false

    }
  },
  methods: {
    ...mapActions([
      'postCheckout'
    ])
  }
}
</script>

<style scoped>
.checkoutBtn {
  /* background-color: white; */
}
.checkoutBtn:hover {
  cursor: pointer;
}
.totalMain {
  /* background-color: yellow; */
  background-color: white;
  border: 1px solid #ddd;
  word-wrap:break-word;
  height: 15.5em;
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
