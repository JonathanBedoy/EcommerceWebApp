<template>
<div class="pt-5 container" style="margin-top: 4.8em;">
  <transition name="fade" mode="out-in">
  <div class="QuickViewModal" v-if="focusedItemViewData !== -1 && show">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-6 mb-3 pb-5">
          <b-carousel v-model="carNum" ref="picCarousel" id="carousel-1" :interval="0">
      <b-carousel-slide v-for="(pic, index) in focusedItemViewData.pictures" :key="index" :img-src="pic"></b-carousel-slide>
    </b-carousel>
    <div class="d-flex justify-content-center">
      <b-img v-for="(pic, index) in focusedItemViewData.pictures" :key="index" rounded="0" alt="Not rounded image" :src="pic" width=90 height=80 class="picIndicator" :style="{'opacity': carNum === index ? '1': ''}" @click="$refs.picCarousel.setSlide(index)"></b-img>
    </div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="title"><b>{{focusedItemViewData.name}}</b></div>
          <hr style="width: 25%; margin-left: 0; background-color: black">
          <div class="price">$ {{focusedItemViewData.salePrice !== -1 ? focusedItemViewData.salePrice.toFixed(2) : focusedItemViewData.originalPrice.toFixed(2)}} <span class="ml-1 originalPrice" v-if="this.focusedItemViewData.salePrice !== -1">$ {{focusedItemViewData.originalPrice}}</span></div>
          <div class="quantity mt-4" v-if="!inCart">Quantity</div>
          <div class="quantity quan mt-1 mb-2" v-if="!inCart">
            <div class="minusBtn addMinusBtn" @click="incDecQuantity(-1)">-</div>
            <input class="numInput " type="text" v-model="qunatityUpdate">
            <div class="addBtn addMinusBtn" @click="incDecQuantity(1)" >+</div>
          </div>
          <div class="outOfStockBtn mt-3 mb-5" v-if="focusedItemViewData.stock === 0"><span >Out Of Stock</span></div>
          <div class="addToCartBtn mt-3 mb-4" @click="addToCartProc" v-else><span v-if="!inCart">Add to Cart</span><span v-else-if="inCart">In Cart</span></div>
          <hr class="" style="background-color: black; margin-top: 0;">
          <div class="info mt-4">
            <ul>
              <li>💖 {{focusedItemViewData.category}} Lashes </li>
              <li>💖 Reusable up to 20x with proper care</li>
              <li>💖 Free Shipping on orders of $30+</li>
              <li>💖 Local pickup available</li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="mt-5" style="background-color: black; margin-top: 0;">
      <div class="pt-1 pb-5 mt-3">
        <div class="similarItems pb-3">Similar Items</div>
        <div class="row mx-auto text-center d-flex justify-content-center">
          <ItemListing v-for="i in 3" :key="i" :position="similarItems[i]" class="d-flex justify-content-center col" style=""/>
        </div>
      </div>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
import ItemListing from './ItemListing.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'ItemView',
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
      show: true
    }
  },
  computed: {
    ...mapGetters([
      'focusedItemViewData',
      'inCart'
    ]),
    ...mapState([
      'similarItems'
    ])
  },
  components: {
    ItemListing
  },
  created () {
    
    this.mixSimilarItems()
    // console.log(this.$route.params.id)
    this.setFocusIDuseID(this.$route.params.id)
    // console.log('currentlyjerer', this.focusedItemViewData)
    axios.get(`/items`)
      .then(response => {
        this.setItems(response.data)
        this.mixSimilarItems()
        // console.log(this.similarItems)
        // console.log(response.data)
        this.setFocusIDuseID(this.$route.params.id)
        if (this.focusedItemViewData === -1) {
          this.$router.push('/404')
        }
        if (this.focusedItemViewData.salePrice !== -1) {
          this.sale = true
          // console.log(this.sale)
          // let percentOff = (1 - (this.focusedItemViewData.salePrice / this.focusedItemViewData.originalPrice)) * 100
          // percentOff = Math.round(percentOff)
        }
    })
    .catch(err => {
      console.log(err)
    })
    // console.log(this.focusedItemViewData)
  },
  methods: {
    ...mapActions([
      'addToCart',
      'removeFromCart',
      'mixSimilarItems'
    ]),
    ...mapMutations([
      'setItems',
      'setFocusID',
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
      //  this.$bvModal.hide("modal-center")
      this.addToCart(data)
      // $('#exampleModalScrollable').modal('hide')
      this.$router.push('/cart')
      
    }
  },
  watch: {
    '$route.params.id' () {
      this.$refs.picCarousel.setSlide(0)
      this.mixSimilarItems()
      this.show = false
      setTimeout(()=>{
        this.show = true
      }, 200)
      // console.log(this.similarItems)
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

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.7s ease;
}

.fade-leave {}

.fade-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}

.QuickViewModal:hover {
  /* cursor: pointer;
  color: rgb(228, 105, 123);
  transition:all .8s ease-out 0s */
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

.similarItems {
  font-family: 'Baloo 2', cursive;
  text-align: center;
  margin: auto;
  text-decoration: underline black;
  font-size: 1.3em;
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
</style>
