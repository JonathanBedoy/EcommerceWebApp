<template>
  <div class="">
    <Banner class="" style="margin-top: 2.4em;"/>
    <CategorySelect />
    <ItemsLayout style="margin-top: -.1em;"/>
  </div>
</template>

<script>
// import ItemListing from './item/ItemListing.vue'
import ItemsLayout from './item/ItemsLayout.vue'

import Banner from './Banner.vue'
import CategorySelect from './MainPage/CategorySelect.vue'

// import CartPage from './components/Cart/CartPage.vue'

export default {
  name: 'MainPage',
  created () {
    this.$route.query.filter ? this.$store.state.categorySelected = this.$route.query.filter : false
  },
  components: {
    // ItemListing,
    Banner,
    ItemsLayout,
    CategorySelect
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
