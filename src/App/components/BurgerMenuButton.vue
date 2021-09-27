<template>
  <b-col id="burger-menu"
         order="2"
         class="mb-3 mb-md-0 d-xl-none"
         @click="openBurgerMenu"
         :class="{ change: burgerMenuActive }">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </b-col>
</template>

<script>
export default {
  name: 'BurgerMenuButton',
  props: {
    openBurgerMenu: Function,
    burgerMenuActive: Boolean
  }
}
</script>

<style scoped>

</style>
