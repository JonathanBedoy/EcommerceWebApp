<template>
  <div class="row mx-auto  m-0 p-0 barBack justify-content-center">
    <div class="col-3 m-0 p-0" v-for="i in categories" :key="i">
      <NavLink @clicked="changeCategory" :name="i" :active="categorySelected === i" class="mx-auto">{{i}}</NavLink>
    </div>
  </div>
</template>

<script>
import NavLink from '../UI/NavLink.vue'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'CategorySelect',
  components: {
    NavLink,
  },
  computed: {
    ...mapState([
      'categorySelected'
    ]),
  },
  methods: {
    ...mapMutations([
      'setcategorySelected'
    ]),
    changeCategory (category) {
      // this.$route.query.filter = 
      this.$router.replace({ query: { filter: `${category}` } })
      this.setcategorySelected({category})
    }
  },
  data () {
    return {
      categories: ['Silk', 'Mink']
    }
  }
}
</script>

<style>
.barBack {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 .05em .1em 0 rgba(0, 0, 0, 0.2), 0 .1em .2em 0 rgba(190, 167, 167, 0.19);
  
}
</style>
