<template>
    <div class="pt-5 container" style="margin-top: 4.8em;">
      <transition
          name="fade"
          mode="out-in"
      >
        <div v-if="show" class="row mx-auto text-center d-flex justify-content-center">
          <ItemListing v-for="(item) in filteredLayoutItemIndexes" :key="item" :position="item" class="d-flex justify-content-center"/>
        </div>
      </transition>
    </div>
</template>

<script>
import ItemListing from './ItemListing.vue'
import { mapGetters, mapState, mapMutations } from 'vuex'
// import CartPage from './components/Cart/CartPage.vue'

export default {
  name: 'itemsLayout',
  components: {
    ItemListing,
  },
  computed: {
    ...mapState([
      'items',
      'focusedItemViewID'
    ]),
    ...mapGetters([
      'filteredLayoutItemIndexes'
    ]),
  },
  created () {
    // console.log(this.filteredLayoutItemIndexes)
  },
  data () {
    return {
      show: true
    }
  },
  watch: {
    filteredLayoutItemIndexes () {
      this.show = false
      setTimeout(()=>{
        this.show = true
      }, 400)
    }
  },
  methods: {
    ...mapMutations([
      'setItems',
      'setFocusIDuseID'
    ])
  }
}
</script>

<style>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
} */

.bounce-enter-active {
  animation: bounce-in 0.5s ease-in;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.2);
  }
  /* 50% {
    transform: scale(0.6);
  } */
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  /* 50% {
    transform: scale(0.6);
  } */
  100% {
    transform: scale(0.2);
  }
}


</style>
