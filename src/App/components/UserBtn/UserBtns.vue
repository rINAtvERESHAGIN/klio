<template>
  <b-col cols="12"
         md=7 xl="3"
         order-md="3"
         class="text-right d-none d-md-flex"
         id="user-btns"
  >
    <b-button squared
              class="btn-red location-set"
              v-b-modal.modal-city
    >
      <img src="../../../assets/icons/pin_white.svg"
           class="icon-sm"
           alt="Местоположение пользователя"
      >
      <span v-if="CURRENT_CITY !== null">{{ CURRENT_CITY }}</span>
      <b-icon v-else icon="three-dots"
              animation="cylon"/>
    </b-button>
    <div class="float-right">

      <b-link to="/basket">
        <div class="float-right nav-icons">
          <img src="../../../assets/icons/cart-red.svg"
               class="icon-h-lg" alt="Корзина"
          >
          <b-badge v-if="BASKET && BASKET.products.length"
                   pill variant="light"
                   class="basket-badge"
          >
            {{ BASKET.products.length }}
          </b-badge>
        </div>
      </b-link>
      <b-link :to="{ name: 'favorites' }">
        <div class="float-right nav-icons">
          <img src="../../../assets/icons/star-yellow.svg"
               class="icon-h-lg"
               alt="Избранное">
        </div>
      </b-link>
    </div>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserBtns',
  computed: {
    ...mapGetters([
      'CURRENT_CITY',
      'BASKET'
    ])
  }
}
</script>

<style scoped>

</style>
