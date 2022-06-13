<template>
  <div class="backDrop">
    <picture>
      <source 
        media="(min-width: 650px)"
        srcset="../assets/banner.png">
      <source 
        media="(min-width: 465px)"
        srcset="../assets/NiaMobileBanner1.png">
      <img 
      class="pic"
        src="../assets/NiaMobileBanner1.png" 
        alt="Banner">
    </picture>
    <!-- <img class="pic" src="../assets/NiaBanner.png" alt="promotional art"> -->
  </div>
</template>

<script>


export default {
  name: 'banner',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.pic {
  width: 100%;
    /* box-shadow: 0 .05em .1em 0 rgba(0, 0, 0, 0.2), 0 .1em .2em 0 rgba(190, 167, 167, 0.19); */

/* -webkit-box-shadow: 3px 10px 21px -9px rgba(117,117,117,1);
-moz-box-shadow: 3px 10px 21px -9px rgba(117,117,117,1);
box-shadow: 3px 10px 21px -9px rgba(117,117,117,1); */
}
.backDrop {
}

</style>
