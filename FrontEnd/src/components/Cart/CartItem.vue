<template>
  <div class="cartMain ml-1 p-3">
    <div class="row">
      <div class="col-3 pt-4 pic">
        <img :src="cartItems[position].pictures[0]" class="d-block w-75" alt="...">
      </div>
      <div class="col-3 pt-4 px-0 ItemTitle">
        <b class="itemText" @click="showItem()">{{cartItems[position].name}}</b>
      </div>
      <div class="col-3 pt-4 px-2 quantity">
        <span class="pr-2">Qty</span> <input class=" quantityInput"  type="number" name="quantity" v-model="qunatityUpdate" @blur="updateCart()">
      </div>
      <div class="col-3 pt-4 price pr-2">
        <div>${{calculatedPrice().toFixed(2)}}</div> <div class="ml-1 originalPrice" v-if="sale">$ 7.99</div>
      </div>
    </div>
    <div class="row d-flex justify-content-end " style="text-align: right">
      <!-- <div class="col-8"></div> -->
      <div class="px-2 updateBtn" @click="updateCart()">update cart</div><span style="color: #ddd">|</span><div class="px-2 removeBtn text-left" @click="removeItem()">remove</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    position: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  computed: {
    ...mapState([
      'cartItems',
    ]),
    ...mapGetters([
      'focusedItemViewData',
      'cartItemNum'
    ])
  },
  name: 'cart',
  data () {
    return {
      hovering: false,
      cartNum: 6,
      pics: [
        'https://i.imgur.com/7OUsxs1l.jpg',
        'https://i.imgur.com/mIxiypsl.jpg'
      ],
      qunatityUpdate: 1,
      stock: 20,
      total: 0,
      sale: false,
      name: 'Passionate'

    }
  },
  created () {
    
    this.qunatityUpdate = this.cartItems[this.position].quantity
    this.updateCart()
  },
  methods: {
    ...mapMutations([
      'setFocusID'
    ]),
    ...mapActions([
      'changeQuantity',
      'removeFromCart'
    ]),
    updateCart() {
      // console.log('updating: ', this.position, this.cartItems[this.position])
      // console.log("quantityUpdate", this.qunatityUpdate)
      this.changeQuantity({id: this.cartItems[this.position].id, quantity: this.qunatityUpdate})
      this.calculatedPrice()

      this.qunatityUpdate = this.cartItems[this.position].quantity
      if (this.qunatityUpdate === 0) {
        this.removeItem()
      }
    },
    calculatedPrice () {
      let price = this.cartItems[this.position].salePrice !== -1 ? this.cartItems[this.position].salePrice.toFixed(2) : this.cartItems[this.position].originalPrice.toFixed(2)
      this.total = price * this.cartItems[this.position].quantity
      return this.total
    },
    showItem() {
      this.$router.push(`/view/${this.cartItems[this.position].id}`)
      // TODO: show item here
    },
    removeItem() {
      // TODO: remove item here
      this.removeFromCart(this.cartItems[this.position].id)
      this.qunatityUpdate =-1
    }
  },
  watch: {
    cartItemNum () {
      this.updateCart()
    },
    qunatityUpdate (val, oldVal) {
      if (val < 0) {
        this.qunatityUpdate = oldVal
      } else if (val > this.cartItems[this.position].stock) {
        this.qunatityUpdate = this.cartItems[this.position].stock
      }
    }
  }
}
</script>

<style scoped>
.cartMain {
  background-color: white;
  border: 1px solid #ddd;
  word-wrap:break-word;
  transition:all .8s ease-out 0s
}
.ItemTitle {
  font-size: 110%;
  font-family: 'Baloo 2', cursive;
  text-decoration: underline;
  word-wrap:break-word;
}
.itemText:hover {
  cursor: pointer;
}
.quantity {
  font-size: 1em;
  font-family: 'Baloo 2', cursive;
  text-align: center;
}
.quantityInput {
  width: 50%;
  border-left-width: 2px !important;
  box-shadow: 0 !important;
}
.price {
  font-size: 1.5em;
  font-family: 'Baloo 2', cursive;
  text-align: right;
}
.originalPrice {
  text-decoration-line: line-through;
  font-family: 'Baloo 2', cursive;
  font-size: 1rem;
  margin-top: -10px;
  color: rgb(126, 126, 126);
}
.updateBtn {
  font-size: 1rem;
  letter-spacing: -1px;
  font-family: 'Baloo 2', cursive;
  color: rgb(57, 89, 117);
  text-decoration: underline;
}
.updateBtn:hover {
  text-decoration: none;
  cursor: pointer;
}
.removeBtn {
  font-size: 1rem;
  letter-spacing: -1px;
  font-family: 'Baloo 2', cursive;
  color: rgb(247, 52, 18);
  text-decoration: underline;
}
.removeBtn:hover {
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 576px) {
  .price {
    /* background-color: lightblue; */
    font-size: 1em;
  }
  .ItemTitle {
    font-size: 90%;
  }
  .quantity {
    font-size: .8em;
  }
  .removeBtn {
    font-size: .9rem;
  }
  .updateBtn {
    font-size: .9rem;
  }
}
/* @media only screen and (min-width: 576px) {
  .totalMain {
    background-color: grey;
    margin: 0 !important;
  }
}
@media only screen and (min-width: 768px) {
  .totalMain {
    background-color: yellow;
    margin: 0 !important;
  }
}
@media only screen and (min-width: 992px) {
  .totalMain {
    background-color: orange;
    margin: 0 !important;
  }
} */
</style>
