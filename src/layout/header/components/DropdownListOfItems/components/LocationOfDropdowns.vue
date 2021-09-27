<template>
  <ul role="menu"
      tabindex="-1"
      class="dropdown-menu"
      ref="dropdownItem"
  >
    <b-row align-h="around"
           class="bottom-spaced"
           style="padding: 0 10px;"
           v-for="(section, index) in getSections(category)"
           :key="index"
    >
      <b-col class="dropdown-category-container"
             v-for="subcat in section" :key="subcat.id"
      >
        <b-link :to="`/${subcat.path}`">
          <p class="dropdown-category-header">
            {{ subcat.name }}
          </p>
        </b-link>

        <ul class="dropdown-category-list">
          <li v-for="subsubcat in subcat.children"
              :key="subsubcat.id"
          >
            <b-link :to="`/${subsubcat.path}`">
              {{ subsubcat.name }}
            </b-link>
          </li>
        </ul>
      </b-col>
    </b-row>
  </ul>
</template>

<script>
export default {
  name: 'LocationOfDropdowns',
  props: {
    category: Object
  },
  methods: {
    getSections (category) {
      const results = []
      let temparray = []
      const j = category.children.length
      let k = 0
      const chunk = 8
      for (let i = 0; i < j; i += chunk) {
        temparray = category.children.slice(i, i + chunk)
        results[k] = temparray
        k = k + 1
      }
      return results
    }
  }
}
</script>

<style scoped>

</style>
