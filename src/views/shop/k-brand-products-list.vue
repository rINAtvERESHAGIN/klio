<template>
  <b-row class="content-section" v-if="BRAND">
    <b-col cols="12" xl="10" offset-xl="1" v-if="loadingStatus === 'success'">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>{{ BRAND.name }}</h1>
      <b-container fluid>
        <ProductListComponent :categoryData="BRAND" :responseData="BRAND_PRODUCTS" :filtersData="BRAND_FILTERS" :categoryList="showFilters"/>
        <div class="bottom-spaced"></div>
        <b-row class="category-products-desc">
          <b-col cols="12" v-html="BRAND.description"></b-col>
        </b-row>
      </b-container>
    </b-col>
    <b-container fluid>
      <b-row v-if="loadingStatus === 'pending'" class="bottom-spaced">
        <b-col cols="12" class="text-center">
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
        </b-col>
      </b-row>
    </b-container>
    <b-col cols="12" id="back-to-top">
      <a
        href="#"
        class="btn float-right"
        role="button"
        onClick="window.scrollTo({top: 1000, behavior: 'smooth'})"
      >
        <img src="@/assets/img/diamond_rev.svg" width="80px" alt="наверх" v-scroll-to="'body'">
        <p>наверх</p>
      </a>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductListComponent from '../../components/k-product-list-component.vue'

export default {
  name: 'k-product-list',
  metaInfo () {
    return {
      title: this.BRAND ? this.BRAND.name : '',
      meta: [
        { vmid: 'description', name: 'description', content: this.BRAND ? this.BRAND.meta_description : '' },
        { vmid: 'keywords', name: 'keywords', content: this.BRAND ? this.BRAND.meta_keywords : '' }
      ]
    }
  },
  components: {
    ProductListComponent
  },
  props: ['brand_name'],
  data () {
    return {
      breadcrumbs: null,
      loadingStatus: 'pending',
      showFilters: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === from.path) {
        var data = { brand: this.brand_name, params: this.getParams() }
        this.GET_BRAND_PRODUCTS_FROM_API(data)
      } else {
        this.loadFullData()
      }
    }
  },
  computed: {
    ...mapGetters([
      'BRAND',
      'BRAND_FILTERS',
      'BRAND_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_BRAND_FROM_API',
      'GET_BRAND_FILTERS_FROM_API',
      'GET_BRAND_PRODUCTS_FROM_API'
    ]),
    getParams () {
      var params = ''
      for (var param in this.$route.query) { params = params + `&${param}=${this.$route.query[param]}` }
      if (params) { params = '?' + params.substring(1) }
      return params
    },
    getBreadcrumbs () {
      return [
        { text: 'Главная', to: { name: 'home' } },
        { text: this.BRAND.name, to: { name: 'brand-products', params: { brand_name: this.BRAND.slug } } }
      ]
    },
    loadFullData () {
      this.GET_BRAND_FROM_API(this.brand_name)
        .then((res) => {
          if (res.data) {
            this.GET_BRAND_FILTERS_FROM_API(this.brand_name)
            var data = { brand: this.brand_name, params: this.getParams() }
            this.GET_BRAND_PRODUCTS_FROM_API(data)
              .then((res) => {
                if (res.data) {
                  this.loadingStatus = 'success'
                }
              })
              .catch(() => {
                this.loadingStatus = 'error'
              })
          }
          this.breadcrumbs = this.getBreadcrumbs()
        })
        .catch(() => {
          this.loadingStatus = 'error'
        })
    }
  },
  mounted () {
    this.loadFullData()
  }
}
</script>

<style>

</style>
