<template>
  <b-nav justified>
    <b-nav-item v-for="(category, cIndex) in HEADER_MENU.items"
                :key="category.id"
    >
      <div class="dropdown b-dropdown btn-group"
           :class="{ active: cIndex === showDropdown }"
           @mouseover="showDropdown = cIndex"
           @mouseleave="showDropdown = null"
      >
        <CategoryButton :category="category"/>
        <LocationOfDropdowns :category="category"/>
      </div>
    </b-nav-item>
  </b-nav>
</template>

<script>
import { mapGetters } from 'vuex'
import LocationOfDropdowns from './components/LocationOfDropdowns'
import CategoryButton from './components/CategoryButton'
export default {
  name: 'DropdownListOfItems',
  components: {
    LocationOfDropdowns,
    CategoryButton
  },
  data () {
    return ({
      showDropdown: null
    })
  },
  computed: {
    ...mapGetters([
      'HEADER_MENU'
    ])
  }
}
</script>

<style scoped>

</style>
