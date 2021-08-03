<template>
  <div class="product-card-container">
    <div class="product-card">
      <b-badge
        v-if="product.special"
        class="product-badge badge-special"
      >
        <b-link :to="{ name: 'special-detail', params: {special_name: product.special.slug } }">
          акция
        </b-link>
      </b-badge>
      <b-badge
        v-else-if="product.is_new == true"
        class="product-badge badge-new"
      >
        новинка
      </b-badge>
      <b-link :to="{ name: 'product-detail', params: { product_name: product.slug, category_slug: categorySlug } }">
        <div class="product-img-container">
          <img
            v-if="product.image.thumbnail"
            :src="product.image.thumbnail" @error="product.image.thumbnail = null"
            :alt="product.image.label"
            class="product-img"
          >
          <img
            v-else
            src="@/assets/icons/diamond_grey.svg"
            width="100px"
            alt="no image available"
            class="product-img-none"
          >
        </div>
      </b-link>
      <p class="product-stock">
        <b-badge
          v-if="Number(product.in_stock) !== 0"
          class="float-left"
        >
          в наличии
        </b-badge>
        <b-badge
          v-else
          class="float-left"
        >
          нет на складе
        </b-badge>
        <span
          v-if="!favorite"
          class="icon icon-star product-favorite-btn float-right"
          @click="addToFavorites(product.id)"
        ></span>
        <span
          v-else
          class="icon icon-star active product-favorite-btn float-right"
          @click="removeFromFavorites(product.id)"
        ></span>
      </p>
      <b-link
        :to="`/catalog/products/${product.slug}`"
        class="product-name-link"
      >
        <p class="product-name">{{ product.name }}</p>
      </b-link>
      <p class="product-art">артикул: {{ product.art }}</p>
      <div class="product-price">
        <div
          v-if="product.special && product.special.new_price && Number(product.in_stock) !== 0"
          class="product-special-price-wrapper"
        >
          <p class="product-old-price"><font-awesome-icon icon="ruble-sign" /> {{ product.price }}</p>
          <p class="product-special-price">
            <span v-if="product.special.threshold" class="product-special-price-threshold">от {{ product.special.threshold }} {{ product.units }}</span>
            <font-awesome-icon icon="ruble-sign" /> {{ product.special.new_price }}
          </p>
        </div>
        <p v-else-if="Number(product.in_stock) !== 0"><font-awesome-icon icon="ruble-sign" /> {{ product.price }}</p>
        <p v-if="product.wholesale_price && Number(product.in_stock) !== 0"
          class="product-wholesale-price">
          <font-awesome-icon icon="ruble-sign" /> {{ product.wholesale_price }}
            <span class="product-wholesale-price-cond">от <span class="red">{{ product.wholesale_threshold }}</span> {{ product.units }}</span></p>
        <div v-if="!isAdded() && Number(product.in_stock) !== 0" class="product-ammount">
          <span class="product-remove" @click="removeItem">-</span>
            <b-form-input
              v-model="productAmount"
              number
              class="form-input"
            ></b-form-input>
          <span class="product-add" @click="addItem">+</span>
        </div>
      </div>
      <div class="product-btn-container">
        <b-button v-if="isAdded()" squared size="lg" class="btn btn-yellow" :to="{ name: 'basket' }">
          просмотр корзины
        </b-button>
        <b-button v-else-if="Number(product.in_stock) === 0" squared size="lg" class="btn btn-yellow" disabled>
          ожидается поставка
        </b-button>
        <b-button v-else squared size="lg" class="btn btn-yellow" @click="addToBasket(product.id, productAmount)">
          в корзину
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'k-product-card',
  props: ['categoryData', 'productData'],
  data () {
    return {
      categorySlug: this.categoryData,
      product: this.productData,
      countedDecimals: this.countDecimals(Number(this.productData.base_amount)),
      popoverActive: false,
      productAmount: Number(this.productData.base_amount).toFixed(this.countDecimals(Number(this.productData.base_amount)))
    }
  },
  computed: {
    ...mapGetters([
      'BASKET_PRODUCTS_IDS',
      'FAVORITE_PRODUCT'
    ]),
    favorite () {
      return this.FAVORITE_PRODUCT(this.product.id)
    }
  },
  mounted () {
    this.popoverActive = true
  },
  methods: {
    ...mapActions([
      'ADD_TO_BASKET',
      'ADD_TO_FAVORITES',
      'REMOVE_FROM_FAVORITES'
    ]),
    addItem: function () {
      this.productAmount = (Number(this.productAmount) + Number(this.product.base_amount)).toFixed(this.countedDecimals)
    },
    addToBasket (id, amount) {
      if (Number(amount) > Number(this.product.in_stock)) {
        this.$bvModal.show('modal-amount-error')
      } else {
        var price = this.getPrice()
        var data = { id: id, amount: Number(amount), price: price }
        this.ADD_TO_BASKET(data)
      }
    },
    addToFavorites (id) {
      this.ADD_TO_FAVORITES(id)
    },
    countDecimals: function (value) {
      if (Math.floor(value) === value) return 0
      var afterDot = value.toString().split('.')[1].replace(/\.0+$/, '')
      if (afterDot !== '') return 2
      return value.toString().split('.')[1].length || 0
    },
    getPrice () {
      var product = this.product
      var price = product.price
      if (product.special && product.special.new_price) {
        if (this.productAmount >= product.special.threshold) {
          price = product.special.new_price
        }
      }
      if (product.wholesale_price && product.wholesale_threshold) {
        if (this.productAmount >= product.wholesale_threshold) {
          if (product.special && product.special.new_price) {
            price = product.wholesale_price < product.special.new_price ? product.wholesale_price : price
          } else { price = product.wholesale_price }
        }
      }
      return price
    },
    isAdded () {
      const isAdded = this.BASKET_PRODUCTS_IDS.includes(this.product.id)
      return isAdded
    },
    removeFromFavorites (id) {
      this.REMOVE_FROM_FAVORITES(id)
    },
    removeItem: function () {
      if (this.productAmount > this.product.base_amount) {
        this.productAmount = (Number(this.productAmount) - Number(this.product.base_amount)).toFixed(this.countedDecimals)
      }
    }
  }
}
</script>

<style lang="scss">
  .icon-star.active {
    background-image: url(/img/star_yellow.c0210b84.svg);
  }
</style>
