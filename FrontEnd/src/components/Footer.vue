<template>
  <footer class="footer">
    <div class="mx-auto pt-2 container text-center">
      <a class="socialIcon mr-4" href="https://www.facebook.com/nialashesbydenise/" target="_blank" ><i class="fab fa-facebook-f"></i></a>
      <a class="socialIcon mr-4" href="https://www.instagram.com/nialashesbydenise/" target="_blank" ><i class="fab fa-instagram"></i></a>
    </div>
    <div class="text-center pt-1">
      © 2018 Copyright: Nia Lashes by Denise
    </div>
  </footer>
</template>

<script>


export default {
  name: 'Footer',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.footer {
  /* margin-top: 6em; */
  background-color: white;
  height: 5.5em;
  /* width: 100%; */

}
.socialIcon {
  font-size: 1.8em;
  color: rgb(75, 73, 73);
}
.socialIcon:hover {
  color: rgb(201, 159, 159);
  cursor: pointer;
}
.socialIcon:visited {
  color: rgb(201, 159, 159);
}
</style>
