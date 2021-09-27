<template>
  <v-btn
    elevation="2"
    style="background-color: #b7594c;color: #fdfafa;"
    v-if="CURRENT_USER"
    @click="logout"
  >
    Выйти
  </v-btn>

  <v-btn
    v-else
    elevation="2"
    style="background-color: #b7594c;color: #fdfafa;"
    v-b-modal.modal-login
    @click="closeDrawer"
  >
    Войти
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EnterButton',
  props: {
    closeDrawer: Function
  },
  methods: {
    ...mapActions([
      'LOGOUT',
      'GET_ACTIVE_ORDER_FROM_API',
      'GET_BASKET_FROM_API'
    ]),
    logout () {
      this.LOGOUT()
        .then(() => {
          this.GET_ACTIVE_ORDER_FROM_API()
          this.GET_BASKET_FROM_API()
        })
    }
  },
  computed: {
    ...mapGetters([
      'CURRENT_USER'
    ])
  }
}
</script>

<style scoped>
.override-button {
  background-color: #b7594c;
  color: #fdfafa;
}
</style>
