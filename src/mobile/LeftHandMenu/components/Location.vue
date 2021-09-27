<template>
    <v-chip
        class="ma-2"
        color="primary"
        label
    >
      <v-icon left>
        mdi-map-marker-outline
      </v-icon>
      {{CURRENT_CITY}}
    </v-chip>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Location',
  computed: {
    ...mapGetters([
      'CURRENT_CITY'
    ])
  }
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
