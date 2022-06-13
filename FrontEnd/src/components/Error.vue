<template>
  <div class="errorText container text-center" style="margin-top: 4.8em;">
    <img class="mb-3" src="../assets/errorImage.jpg" width="300px" alt="Question Mark" srcset=""><br>
    Looks like the place you were trying to visit is no longer available or has moved to another location. <br> <span class="mx-auto">Sorry for the inconvenience!</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cart',
  created () {
    console.log('error has occured')
  },
  computed: {
    ...mapGetters([
      'cartItemNum'
    ])
  },
  data () {
    return {
      hovering: false

    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.errorText {
  /* margin-bottom: -24.5%; */
  font-size: 1.2em;
  /* cursor: pointer; */
  /* color: rgb(228, 105, 123); */
  transition:all .8s ease-out 0s
}
</style>
