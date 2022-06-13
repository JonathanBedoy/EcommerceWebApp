<template>
  <div class="container">
    <div class="backOrderView p-5 mb-3" style="margin-top: 4.4em;" v-if="orderDetails !== -1 && error === ''">
      <div class="orderNumber text-center">
        Order ID: {{$route.params.orderId}}
      </div>
      <div class="text-center">
        Order Successful! <br/>
        Your order should arrive by mail soon!
      </div>
      <OrderItem v-for="(i, index) in orderDetails.cartItems" :key="index" :position="index"/>
      <div class="orderTotal d-flex justify-content-center">
        <orderTotal />
      </div>
    </div>
    <div class="backOrderView p-5 mb-3" style="margin-top: 4.4em;" v-else-if="error !== ''">
      <div class="text-center">
        Something went wrong! <br/>
        {{error}} <br/>
        Please Try Again
      </div>
    </div>
    <div class="backOrderView p-5 mb-3" style="margin-top: 4.4em;" v-else>
      <div class="text-center">
        <b-spinner type="grow" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>

</template>

<script>
import OrderItem from './OrderItem.vue'
import orderTotal from './OrderTotal.vue'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'cart',
  components: {
    OrderItem,
    orderTotal
  },
  created () {
    if (this.$route.query.cancel) {
      axios.get(`/cancelorder/${this.$route.params.orderId}`)
        .then(() => {
          console.log('Order cancelled returning to cart')
        })
      this.$router.push('/cart')
    }
    let orderUrl = `/order/${this.$route.params.orderId}`
    if (this.$route.query.paymentId) {
      orderUrl += `?paymentId=${this.$route.query.paymentId}&token=${this.$route.query.token}&PayerID=${this.$route.query.PayerID}`
    }
    axios.get(orderUrl)
    .then((result) => {
      if (result.data.error) {
        this.error = result.data.error
      } else {
      if (result.data.justPaid) {
        this.setCartItems([])
        this.updateLocalStorage()
      }
      this.setOrderDetails(result.data)
      }
    }).catch((err) => {
      console.log(err)
    })
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
      error: ''

    }
  },
  methods: {
    ...mapMutations([
      'setFocusID',
      'setCartItems',
      'updateLocalStorage'
    ]),
    ...mapActions([
      'setOrderDetails'
    ])
  }
}
</script>

<style scoped>
.backOrderView {
  background-color: white;
  border: 1px solid #ddd;
}
@media only screen and (max-width: 400px) {
  .backOrderView {
    /* background-color: lightblue; */
    font-size: .5em;
    padding: 10px !important;
  }
}
@media only screen and (max-width: 560px) {
  .backOrderView {
    margin-top: 5.5em;
    /* background-color: lightblue; */
    padding: 10px !important;
  }
}
</style>
