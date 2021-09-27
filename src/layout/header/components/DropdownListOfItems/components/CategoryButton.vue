<template>
  <b-button aria-haspopup="true"
            aria-expanded="false"
            type="button"
            :to="`/${category.path}`"
            class="btn dropdown-toggle dropdown-toggle-no-caret">
    {{ category.name }}
  </b-button>
</template>

<script>
export default {
  name: 'CategoryButton',
  props: {
    category: Object
  }
}
</script>

<style scoped>

</style>
