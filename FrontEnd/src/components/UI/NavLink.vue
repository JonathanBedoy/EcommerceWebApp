<template>
  <div @click="$emit('clicked', name)" class="NiaNavLink text-center" :class="{'NiaActiveLink': this.active}">
      <slot/>
  </div>
</template>

<script>

export default {
  name: 'NavLink',
  props: {
    name: {
      type: String,
      default: function () {
        return ''
      }
    },
    active: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  components: {

  },
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
.NiaNavLink {
  font-size: 1.5em;
  
}
.NiaNavLink:hover {
  cursor: pointer;
  transition: 0;
  background-color: rgba(248, 227, 227, 0.329);
  /* color: white; */
}
.NiaActiveLink {
  background-color: rgba(248, 227, 227, 1);
  transition: 1s ease-in;
  /* color: white; */
  text-decoration: underline;
}
.NiaActiveLink:hover {
  background-color: rgba(248, 227, 227, 1);
}
</style>
