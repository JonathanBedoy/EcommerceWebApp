<template>
  <div class="col mx-auto mb-5 " style="width: 18rem;margin: auto;height: 20rem;">
    <!-- https://i.imgur.com/7OUsxs1l.jpg -->
    <div class="card" style="width: 18rem;height: 18rem;border-radius: 0 !important;">
      
        <div @mouseenter="hovering = true" @mouseleave="hovering = false" class="picHolder mx-auto mt-1 px-0" style="width: 99%;" @click="setFocusID(position); $router.push(`/view/${items[position].id}`)">
          <!-- <transition name="quickViewAnim" mode="out-in"> -->
            <img :src="items[position].pictures[0]" style="width: 99%; cursor: pointer;" class="img1 card-img-top mx-auto" alt="Pixie Lashe" >
            <img :src="items[position].pictures[1]" style="width: 99%; cursor: pointer;" class="img2 card-img-top mx-auto" alt="Pixie Lashe" >
          <!-- </transition> -->
        </div>

        <transition name="">
          <!-- @click should set data in vuex that modal will then use to render itself -->
          <div class="quickView text-center d-flex justify-content-center" v-if="hovering && quickviewOption" @mouseenter="hovering = true" @mouseleave="hovering = false" @click="setFocusID(position); $router.replace({ query: { quickview: `${focusedItemViewData.id}` } }); $bvModal.show('modal-center')" data-toggle="modal" data-target="#exampleModalScrollable">
            <span class="my-auto" style="font-size: 1em;color: white;">Quick View</span>
          </div>
        </transition>
        <div class="topRightBadge" v-if="badgeText !== ''" :style="[{'background-color': badgeColor}, {'color': badgeTextColor}]">
          <b>{{badgeText}}</b>
        </div>
          <!-- <div class="col d-flex justify-content-end">
            <a href="#" class="btn btn-primary">Add To Cart</a>
          </div> -->

    </div>
    <div style="position: absolute; top: 95%;width:100%;" class="" @click="setFocusID(position); $router.push(`/view/${items[position].id}`); ">
      
      <h6 class="card-title itemName text-break" ><b>{{items[position].name}}</b></h6>
      <h6 class="card-subtitle text-center itemPrice text-break" >${{items[position].salePrice === -1 ? items[position].originalPrice.toFixed(2): items[position].salePrice}} <span v-if="items[position].salePrice !== -1" class="itemPriceSale">${{items[position].originalPrice}}</span> </h6>
      <!-- <h6 class="card-subtitle text-center itemPriceSale text-break">$7.99</h6> -->
      
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
  name: 'item',
  data () {
    return {
      hovering: false,
      badgeText: '',
      badgeColor: '',
      badgeTextColor: 'black',
      sale: false,
      quickviewOption: true
    }
  },
  computed: {
    ...mapState([
      'items',
    ]),
    ...mapGetters([
      'focusedItemViewData'
    ]),
    sizeWidth: function () {
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
  },
  created () {
    this.changeLayout()
    // if (this.sizeWidth <= 768) {
    //   this.quickviewOption = false
    // }
    // // console.log(this.position)
    // if (this.items[this.position].stock <= 0) {
    //   this.badgeText = 'SOLD OUT'
    //   this.badgeColor = 'rgb(65, 63, 64)'
    //   this.badgeTextColor = 'rgb(255, 255, 255)'
    // } else if (this.items[this.position].salePrice !== -1) {
    //   this.sale = true
    //   let percentOff = (1 - (this.items[this.position].salePrice / this.items[this.position].originalPrice)) * 100
    //   percentOff = Math.round(percentOff)
    //   this.badgeText = `${percentOff}% OFF`
    //   this.badgeTextColor = 'black'
    //   this.badgeColor = 'rgba(115, 216, 89, 0.438)'
    // } else if (this.items[this.position].stock <= 10) {
    //   this.badgeText = `${this.items[this.position].stock} LEFT!`
    //   this.badgeTextColor = 'rgb(255, 255, 255)'
    //   this.badgeColor = 'rgb(65, 63, 64)'
    // }
  },
  watch: {
    itemCategory () {
      this.changeLayout()
    },
    position () {
      this.changeLayout()
    },
    '$route.params.id' () {
      this.changeLayout()
    },
    sizeWidth: (val) => {
      if (val <= 768) {
        this.quickviewOption = false
      } else {
        this.quickviewOption = true
      }
    }
  },
  methods: {
    ...mapMutations([
      'setFocusID'
    ]),
    changeLayout () {
      this.hovering = false
      this.badgeText = ''
      this.badgeColor = ''
      this.badgeTextColor = 'black'
      this.sale = false
      this.quickviewOption = true
      if (this.sizeWidth <= 768) {
        this.quickviewOption = false
      }
      if (this.items[this.position].stock <= 0) {
      this.badgeText = 'SOLD OUT'
      this.badgeColor = 'rgb(65, 63, 64)'
      this.badgeTextColor = 'rgb(255, 255, 255)'
    } else if (this.items[this.position].salePrice !== -1) {
      this.sale = true
      let percentOff = (1 - (this.items[this.position].salePrice / this.items[this.position].originalPrice)) * 100
      percentOff = Math.round(percentOff)
      this.badgeText = `${percentOff}% OFF`
      this.badgeTextColor = 'black'
      this.badgeColor = 'rgba(115, 216, 89, 0.438)'
    } else if (this.items[this.position].stock <= 10) {
      this.badgeText = `${this.items[this.position].stock} LEFT!`
      this.badgeTextColor = 'rgb(255, 255, 255)'
      this.badgeColor = 'rgb(65, 63, 64)'
    }
    }
  }
}
</script>

<style scoped>
.quickView {
  position: absolute;
  top: 14rem;
  left: 4rem;
  width: 60%;
  height: 2.5rem;
  background-color: rgb(255, 116, 137);
  font-family: 'Baloo 2', cursive;
  cursor: pointer;
}
.quickView:hover {
  background-color: rgb(151, 151, 151);
  transition: 1s;
}
.topRightBadge{
  /* rgba(255, 0, 0, 0.438) */
  background-color: rgba(255, 0, 0, 0.438);
  position: absolute;
  width: 5.1rem;
  /* background-color: lightpink; */
  left: 0rem;
  font-family: 'Baloo 2', cursive;
  word-spacing: .2em;
}
.img1 {
  position: absolute;
  top: 0.5%;
  left: .5%;
  transition:all .6s ease-out 0s
}
.picHolder:hover .img1{
  opacity: 0;
  
}

.itemName {
  font-family: 'Baloo 2', cursive;
  font-size: 1.09rem;
}
.itemName:hover {
  text-decoration: underline;
  cursor: pointer;
}
.itemPrice {
  font-family: 'Baloo 2', cursive;
  font-size: 1.05rem;
}
.itemPriceSale {
  text-decoration-line: line-through;
  font-family: 'Baloo 2', cursive;
  font-size: .9rem;
  color: rgb(126, 126, 126);
}
</style>
