<template>
  <b-row>
    <b-col cols="3" id="leftbar" v-if="LEFT_MENU !== false" class="d-none d-xl-block">
      <ul v-if="LEFT_MENU">
        <CategoryMenuItem v-for="category in LEFT_MENU.items" :key="category.id" :categoryData="category" />
      </ul>
    </b-col>
    <b-col cols="12" :xl="LEFT_MENU === false ? 12 : 9" id="content-area">
      <b-carousel id="carousel-main" :interval="4000" controls indicators background="#ababab"
        img-width="1256" img-height="480" style="text-shadow: 1px 1px 2px #333;" v-if="loadingBanners === 'success'">
        <BannerItem v-for="banner in BANNERS" :key="banner.id" :bannerData="banner" />
      </b-carousel>
      <b-col cols="12" class="text-center" v-else-if="loadingBanners === 'pending'">
            <b-spinner type="grow" class="m-3"></b-spinner>
            <b-spinner type="grow" class="m-3"></b-spinner>
            <b-spinner type="grow" class="m-3"></b-spinner>
      </b-col>
      <b-col cols="12" v-if="loadingCategories === 'success'">
        <b-row align-h="between" class="popular-categories">
          <b-col cols="12" md="6" v-for="(category, index) in CATEGORIES_MAIN" :key="category.id">
            <CategoryCard :categoryData="category" :colorData="[(index + 1) % 2 === 0 ? 'red': 'yellow']" />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="text-center" v-else-if="loadingCategories === 'pending'">
            <b-spinner type="grow" class="m-3"></b-spinner>
            <b-spinner type="grow" class="m-3"></b-spinner>
            <b-spinner type="grow" class="m-3"></b-spinner>
      </b-col>
      <div class="blk-width-85 product-list" id="specials" >
        <h1 class="text-upper"><b-link class="main-page-link" :to="{ name: 'specials'}">Акции</b-link></h1>
        <hooper :settings="hooperSettings" v-if="loadingSpecProds === 'success'">
          <slide v-for="(product, index) in PRODUCTS_SPECIAL_MAIN" :key="index" :index="index">
            <ProductCard :key="product.id" :productData="product" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
        <b-col cols="12" class="text-center" v-else-if="loadingSpecProds === 'pending'">
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
        </b-col>
        <p v-else-if="loadingSpecProds === 'empty'" style="margin: 30px 0 60px 0">К сожалению, в настоящий момент данный раздел пуст.</p>
      </div>
      <div class="blk-width-85 subscribe-blk">
        <p>Подпишитесь на рассылку новостей и выгодных предложений от Клио!</p>
        <b-form @submit.prevent="subscribe" method="POST">
          <b-input-group size="lg" >
            <b-form-input v-model="subscriptionEmail" placeholder="e-mail" class="form-input"></b-form-input>
            <b-input-group-append>
              <b-button squared size="lg" text="Найти" type="submit" class="btn btn-yellow d-none d-md-block">Подписаться</b-button>
            </b-input-group-append>
          </b-input-group>
          <b-button squared size="lg" text="Найти" type="submit" class="btn btn-yellow btn-block d-md-none mt-2">Подписаться</b-button>
        </b-form>
        <p class="form-error home-subscribe-error" v-if="err && err.email">{{ err.email[0] }}</p>
      </div>
      <div class="blk-width-85 product-list" id="new-products">
        <h1 class="text-upper"><b-link class="main-page-link" :to="{ name: 'new-products'}">Новинки</b-link></h1>
        <hooper :settings="hooperSettings" v-if="loadingNewProds === 'success'">
          <slide v-for="(product, index) in PRODUCTS_NEW_MAIN" :key="index" :index="index">
            <ProductCard :key="product.id" :productData="product" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
        <b-col cols="12" class="text-center" v-else-if="loadingNewProds === 'pending'">
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
        </b-col>
        <p v-else-if="loadingNewProds === 'empty'" style="margin: 30px 0 60px 0">К сожалению, в настоящий момент данный раздел пуст.</p>
      </div>
      <div class="blk-width-85 brand-list" id="brands">
        <h1 class="text-upper">Бренды</h1>
        <hooper :infiniteScroll="true" :wheelControl="false" :settings="hooperSettings" v-if="loadingBrands === 'success'">
          <slide v-for="(brand, index) in BRANDS" :key="index" :index="index">
            <BrandCard :key="brand.id" :brandData="brand" />
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
        <b-col cols="12" class="text-center" v-else-if="loadingBrands === 'pending'">
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
        </b-col>
        <p v-else-if="loadingBrands === 'empty'" style="margin: 30px 0 60px 0">К сожалению, в настоящий момент данный раздел пуст.</p>
      </div>
      <b-col cols="12" id="back-to-top">
        <a href="#" class="btn float-right" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
          <img src="@/assets/img/diamond_rev.svg" width="80px" alt="" v-scroll-to="'body'">
          <p>наверх</p>
        </a>
      </b-col>
    </b-col>
  </b-row>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import { email, required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import 'hooper/dist/hooper.css'

import BannerItem from '../components/k-banner-item.vue'
import BrandCard from '../components/k-brand-card.vue'
import CategoryCard from '../components/k-category-card.vue'
import CategoryMenuItem from '../components/k-category-menu-item.vue'
import ProductCard from '../components/k-product-card.vue'

export default {
  name: 'k-home',
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    BannerItem,
    BrandCard,
    CategoryCard,
    CategoryMenuItem,
    ProductCard
  },
  data () {
    return {
      err: null,
      hooperSettings: {
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
          1290: {
            itemsToShow: 4
          },
          2000: {
            itemsToShow: 5
          },
          2400: {
            itemsToShow: 6
          }
        }
      },
      loadingBanners: 'pending',
      loadingBrands: 'pending',
      loadingCategories: 'pending',
      loadingNewProds: 'pending',
      loadingSpecProds: 'pending',
      subscriptionEmail: null
    }
  },
  computed: {
    ...mapGetters([
      'BANNERS',
      'BRANDS',
      'CATEGORIES_MAIN',
      'LEFT_MENU',
      'PRODUCTS_NEW_MAIN',
      'PRODUCTS_SPECIAL_MAIN'
    ])
  },
  methods: {
    ...mapActions([
      'CREATE_SUBSCRIPTION',
      'GET_BANNERS_FROM_API',
      'GET_BRANDS_FROM_API',
      'GET_CATEGORIES_FOR_MAIN_FROM_API',
      'GET_NEW_PRODUCTS_FOR_MAIN_FROM_API',
      'GET_SPECIAL_PRODUCTS_FOR_MAIN_FROM_API'
    ]),
    subscribe () {
      var subscriptionData = {
        email: this.subscriptionEmail
      }
      this.CREATE_SUBSCRIPTION(subscriptionData)
        .then((res) => {
          if (res.status === 200) {
            this.err = null
            this.$bvModal.show('modal-subscribe')
          } else {
            this.err = res.response.data
          }
        })
    }
  },
  mounted () {
    this.GET_BANNERS_FROM_API()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            this.loadingBanners = 'success'
          } else {
            this.loadingBanners = 'empty'
          }
        } else {
          this.loadingBanners = 'error'
        }
      })
    this.GET_BRANDS_FROM_API()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            this.loadingBrands = 'success'
          } else {
            this.loadingBrands = 'empty'
          }
        } else {
          this.loadingBrands = 'error'
        }
      })
    this.GET_CATEGORIES_FOR_MAIN_FROM_API()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            this.loadingCategories = 'success'
          } else {
            this.loadingCategories = 'empty'
          }
        } else {
          this.loadingCategories = 'error'
        }
      })
    this.GET_NEW_PRODUCTS_FOR_MAIN_FROM_API()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            this.loadingNewProds = 'success'
          } else {
            this.loadingNewProds = 'empty'
          }
        } else {
          this.loadingNewProds = 'error'
        }
      })
    this.GET_SPECIAL_PRODUCTS_FOR_MAIN_FROM_API()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            this.loadingSpecProds = 'success'
          } else {
            this.loadingSpecProds = 'empty'
          }
        } else {
          this.loadingSpecProds = 'error'
        }
      })
  },
  validations: {
    subscription: {
      email,
      required
    }
  }
}
</script>

<style lang="scss" scoped>

.home-subscribe-error {
  margin: 10px 0 0 0;
  right: 25%;
}
</style>
