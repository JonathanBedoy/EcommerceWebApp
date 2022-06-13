<template>
<div >
  <b-modal v-model="open" id="modal-center" class="rounded-0" scrollable size="xl" hideFooter centered hideHeader style="border-radius: 0 !important; height: 45em !important;">
    <!-- <p class="my-4">Vertically centered modal!</p> -->
    <div class="closeButton d-flex justify-content-center" @click="$bvModal.hide('modal-center')" >
                <span class="closeIcon"><b-icon-x></b-icon-x></span>
                </div>
    <div class="rounded-0" style="border-radius: 0 !important; height: 45em !important;" v-if="focusedItemViewData != -1">
          <div class="">
            <div class="container">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-7 ">
                  <b-carousel v-model="carNum" ref="picCarousel" id="carousel-1" :interval="0">
                    <!-- Text slides with image -->
                    <b-carousel-slide v-for="(pic, index) in focusedItemViewData.pictures" :key="index" :img-src="pic"></b-carousel-slide>
                  </b-carousel>
                  <div class="d-flex justify-content-center">
                    <b-img v-for="(pic, index) in focusedItemViewData.pictures" :key="index" rounded="0" alt="Not rounded image" :src="pic" width=90 class="picIndicator" :style="{'opacity': carNum === index ? '1': ''}" @click="$refs.picCarousel.setSlide(index)"></b-img>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-4">
                  <div class="title"><b>{{focusedItemViewData.name}}</b></div>
                  <hr style="width: 25%; margin-left: 0; background-color: black">
                  <div class="price">$ {{focusedItemViewData.salePrice !== -1 ? focusedItemViewData.salePrice.toFixed(2) : focusedItemViewData.originalPrice.toFixed(2)}} <span class="ml-1 originalPrice" v-if="focusedItemViewData.salePrice !== -1">$ {{focusedItemViewData.originalPrice}}</span></div>
                  <div class="quantity mt-5" v-if="!inCart">Quantity</div>

                  <div class="quantity quan mt-1" v-if="!inCart">
                    <div class="minusBtn addMinusBtn" @click="incDecQuantity(-1)">-</div>
                    <input class="numInput " type="text" v-model="qunatityUpdate">
                    <div class="addBtn addMinusBtn" @click="incDecQuantity(1)" >+</div>
                  </div>
                  <div class="outOfStockBtn mt-3 mb-5" v-if="focusedItemViewData.stock === 0"><span >Out Of Stock</span></div>
                  <div class="addToCartBtn mt-3 mb-5" @click="addToCartProc" v-else><span v-if="!inCart">Add to Cart</span><span v-else>In Cart</span></div>
                    <hr class="" style="background-color: black">
                  <div class="info mt-5">
                    <ul>
                      <li>💖 {{focusedItemViewData.category}} Lashes </li>
                      <li>💖 Reusable up to 20x with proper care</li>
                      <li>💖 Free Shipping on orders of $30+</li>
                      <li>💖 Local pickup available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </b-modal>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'


export default {
  name: 'QuickViewModal',
  data () {
    return {
      hovering: false,
      pics: [
        'https://i.imgur.com/7OUsxs1l.jpg',
        'https://i.imgur.com/mIxiypsl.jpg'
      ],
      name: 'Pixie',
      quantity: '1',
      qunatityUpdate: '1',
      sale: false,
      carNum: 0,
      open: false,
      replaced: -1
    }
  },
  computed: {
    ...mapGetters([
      'focusedItemViewData',
      'inCart'
    ])
  },
  mounted () {
    if (this.$route.query.quickview) {
      // console.log('yes tshere is a quickview open')
      this.setFocusIDuseID(this.$route.query.quickview)
      this.open = true
      // adter axios get if id still doesnt exist then close it
      setTimeout(() => {
        if (this.focusedItemViewData === -1) {
          this.open = false
        }
      }, 2000);
    }
    if (this.focusedItemViewData.salePrice !== -1) {
      this.sale = true
      // console.log(this.sale)
    }
  },
  methods: {
    ...mapActions([
      'addToCart',
      'removeFromCart'
    ]),
    ...mapMutations([
      // 'addToCart',
      // 'removeFromCart',
      'setFocusIDuseID'
    ]),
    incDecQuantity(amount) {
      if (isNaN(this.qunatityUpdate)) {
        this.qunatityUpdate = 1
      }
      this.qunatityUpdate = parseInt(this.qunatityUpdate) + amount
      if (parseInt(this.qunatityUpdate) < 1) {
        this.qunatityUpdate = 1
      }
    },
    addToCartProc() {
      let data = {...this.focusedItemViewData, quantity: this.qunatityUpdate}
      
      this.addToCart(data)
      // $('#exampleModalScrollable').modal('hide')
      this.$router.push('/cart')
      this.$bvModal.hide("modal-center")
    }
  },
  watch: {
    open (val) {
      if (!val && this.$route.query.quickview) {
        this.$router.replace({})
        if (this.$route.name === 'ItemView') {
          this.setFocusIDuseID(this.$route.params.id)
        }
      } else {
        if (this.$route.query.quickview) {
      // console.log('yes tshere is a quickview open')
      this.setFocusIDuseID(this.$route.query.quickview)
      this.open = true
      // adter axios get if id still doesnt exist then close it
      setTimeout(() => {
        if (this.focusedItemViewData === -1) {
          this.open = false
        }
      }, 2000);
    }
    if (this.focusedItemViewData.salePrice !== -1) {
      this.sale = true
      // console.log(this.sale)
    }
      }
    },
    qunatityUpdate (val, oldVal) {
      if (val < 0) {
        this.qunatityUpdate = oldVal
      } else if (val > this.focusedItemViewData.stock) {
        this.qunatityUpdate = this.focusedItemViewData.stock
      }
      if (isNaN(this.qunatityUpdate)) {
        this.qunatityUpdate = this.quantity
      }
      if (this.qunatityUpdate === 0) {
        // this.removeItem()
      }
      this.quantity = this.qunatityUpdate
    }
  }
}
</script>

<style scoped>
/* .closeButton {
  background-color: #a7a7a7;
  opacity: 0;
  text-align: center;
  position: absolute;
  top: 1px;
  right: 2.01px;
  width: 3em;
  height: 3.5em;
} */
.closeIcon {
  background-color: white;
  padding-top: 1em;
  text-align: center;
  position: absolute;
  top: 1.01px;
  right: 2.01px;
  width: 3em;
  height: 3.5em;
  
  /* opacity: 0; */
  color: black;
  /* margin-top: 30%; */
  /* margin-left: 2px; */
}
.closeIcon:hover{
   background-color: #a7a7a7;
  cursor: pointer;
  opacity: 1;
  color: white;
  transition:all .8s ease-out 0s
}
.title {
  font-size: 2em;
  font-family: 'Baloo 2', cursive;
}
.price {
  font-size: 1.3em;
  font-family: 'Baloo 2', cursive;
}
.originalPrice {
  text-decoration-line: line-through;
  font-family: 'Baloo 2', cursive;
  font-size: .9rem;
  color: rgb(126, 126, 126);
}
.quantity {
  font-size: 1.3em;
  font-family: 'Baloo 2', cursive;
  width: 40%;
}
.quan {
  display: inline-block;
}
.minusBtn {
  background-color: white;
  text-align: center;
  width: 30%;
  height: 2em;
  padding: .2em 0;
  display: inline-block;
  border: 1px solid rgba(168, 168, 168, 0.5);
}
.addBtn {
  background-color: white;
  text-align: center;
  width: 30%;
  height: 2em;
  padding: .2em 0;
  display: inline-block;
  border: 1px solid rgba(168, 168, 168, 0.5);
}
.addMinusBtn:hover {
  cursor: pointer;
}
.numInput {
  color: rgb(126, 126, 126);
  background-color: white;
  text-align: center;
  width: 40%;
  height: 2em;
  padding: .2em 0;
  display: inline-block;
  border: 1px solid rgba(168, 168, 168, 0.5);
}
.addToCartBtn {
  font-size: 1.3em;
  font-family: 'Baloo 2', cursive;
  width: 80%;
  height: 2em;
  padding: .3em 0;
  color: white;
  text-align: center;
  background-color: rgb(255, 143, 159);
}
.addToCartBtn:hover {
  cursor: pointer;
  background-color: rgb(151, 151, 151);
  transition:all .8s ease-out 0s
}
.outOfStockBtn {
  font-size: 1.3em;
  font-family: 'Baloo 2', cursive;
  width: 80%;
  height: 2em;
  padding: .3em 0;
  color: white;
  text-align: center;
  background-color: rgb(151, 151, 151);
}
.info {
  font-family: 'Baloo 2', cursive;
  line-height: 200%;
}

.picIndicator {
  margin-top: 1em;
  padding-right: 1em;
  opacity: .5;
  transition:all .8s ease-out 0s
}
.picIndicator:hover {
  cursor: pointer;
  opacity: 1;
}
@media screen and (max-width: 1000px) {
    .modal {
        width: 100% !important;
    }
}
@media screen and (max-width: 992px) {

  .closeIcon {
    padding-top: 0;
    width: 1.8em;
    height: 1.8em;
  }
}
</style>
