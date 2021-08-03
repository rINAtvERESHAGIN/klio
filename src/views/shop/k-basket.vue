<template>
  <b-row class="content-section">
    <b-col cols="12" lg="10" xl="8" offset-lg="1" offset-xl="2">
      <div class="personal-info-blk">
        <b-nav tabs justified>
          <b-nav-item :to="{ name: 'profile' }">Профиль</b-nav-item>
          <b-nav-item :to="{ name: 'orders' }">Заказы</b-nav-item>
          <b-nav-item :to="{ name: 'favorites' }">Избранное</b-nav-item>
          <b-nav-item active>Корзина</b-nav-item>
        </b-nav>
        <b-container fluid>
          <b-row v-if="checkBasket()" class="basket-products-list">
            <b-col cols="12">
              <BasketProductCard
                v-for="product in BASKET.products"
                :key="product.id"
                :productId="product.id"
                :productQuantity="product.quantity"
              />
              <p class="basket-sum">итого: <span class="red"><font-awesome-icon icon="ruble-sign" /> {{ totalSum() }}</span></p>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col cols="12">
              <p class="basket-empty-msg">Ваша корзина пока пуста</p>
            </b-col>
          </b-row>
          <!-- <b-row v-else class="bottom-spaced">
            <b-col cols="12" class="text-center">
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
            </b-col>
          </b-row> -->
        </b-container>
      </div>
      <!-- <b-row v-if="additionals && additionals.length">
        <div class="col-md-12 additional-products-list">
          <p class="additional-header">дополнительные предложения:</p>
            <hooper :settings="hooperAdditionalSettings">
              <slide v-for="(product, index) in additionals" :key="index" :index="index">
                  <ProductCard :key="product.id" :productData="product" />
              </slide>
              <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
        </div>
      </b-row> -->
    </b-col>
    <b-col cols="12" lg="10" xl="2" offset-lg="1" offset-xl="0">
      <b-button
        v-if="!ORDER_ACTIVE"
        class="btn-yellow basket-order-btn sticky-top"
        @click="startOrder()"
        :disabled="!checkBasket()"
      >
        Оформить заказ <icon class="icon icon-arrow"></icon>
      </b-button>
      <b-button
        v-else
        class="btn-yellow basket-order-btn sticky-top"
        @click="goToBasket()"
        :disabled="!checkBasket()"
      >
        Перейти к заказу <icon class="icon icon-arrow"></icon>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
// import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import { mapActions, mapGetters } from 'vuex'
// import ProductCard from '../../components/k-product-card.vue'
import BasketProductCard from '../../components/k-basket-product-card.vue'

export default {
  name: 'k-basket',
  metaInfo: {
    title: 'Корзина',
    meta: [
      { vmid: 'description', name: 'description', content: 'Корзина на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'корзина, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  components: {
    // Hooper,
    // HooperNavigation,
    // Slide,
    BasketProductCard
    // ProductCard
  },
  data () {
    return {
      hooperAdditionalSettings: {
        wheelControl: false,
        infiniteScroll: true,
        itemsToShow: 1,
        breakpoints: {
          600: {
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 3
          },
          1200: {
            itemsToShow: 4
          },
          2000: {
            itemsToShow: 5
          },
          2400: {
            itemsToShow: 6
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'BASKET',
      'LOADING_BASKET',
      'ORDER_ACTIVE'
    ])
  },
  methods: {
    ...mapActions([
      'CREATE_ORDER',
      'GET_ACTIVE_ORDER_FROM_API',
      'UPDATE_ACTIVE_ORDER_STEP'
    ]),
    checkBasket () {
      if (this.BASKET) {
        if (this.BASKET.products) {
          if (this.BASKET.products.length) {
            return true
          }
        }
      }
    },
    goToBasket () {
      if (this.ORDER_ACTIVE.step === 3) {
        this.UPDATE_ACTIVE_ORDER_STEP({ step: 3, promocode: null })
          .then((res) => {
            this.$router.push({ name: 'orderProcess' })
          })
      } else {
        this.$router.push({ name: 'orderProcess' })
      }
    },
    startOrder () {
      this.CREATE_ORDER()
        .then((res) => {
          if (res.data) {
            this.$router.push({ name: 'orderProcess' })
          }
        })
    },
    totalSum () {
      var total = []
      if (this.checkBasket()) {
        for (var i = 0; i < this.BASKET.products.length; i++) {
          var product = this.BASKET.products[i]
          var itemTotalPrice = product.current_price * (product.quantity / product.base_amount)
          total.push(itemTotalPrice)
        }
      }
      return (total.reduce((a, b) => a + b)).toFixed(2)
    }
  },
  mounted () {
    this.GET_ACTIVE_ORDER_FROM_API()
  }
}
</script>

<style lang='scss'>
  .basket-empty-msg {
    font-size: 24px;
    text-align: center;
    padding: 1rem 0 3rem 0;
  }
</style>
