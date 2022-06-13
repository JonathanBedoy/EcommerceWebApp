<template>
  <div class="cartModal">
    
  </div>
</template>

<script>

export default {
  name: 'cartModal',
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
.cartModal:hover {
  cursor: pointer;
  color: rgb(228, 105, 123);
  transition:all .8s ease-out 0s
}
</style>
