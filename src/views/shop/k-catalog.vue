<template>
  <b-row class="content-section">
    <b-col cols="12" lg="10" offset-lg="1" v-if="loadingStatus === 'success'">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>Каталог</h1>
      <b-container fluid>
        <b-row class="bottom-spaced">
          <b-col cols="12" md="6" lg="4" v-for="(subcategory, index) in CATALOG" :key="subcategory.id">
            <CategoryCard :categoryData="subcategory" :colorData="[(index + 1) % 2 === 0 ? 'red': 'yellow']" />
          </b-col>
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
      <a href="#" class="btn float-right" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
        <img src="@/assets/img/diamond_rev.svg" width="80px" alt="" v-scroll-to="'body'">
        <p>наверх</p>
      </a>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryCard from '../../components/k-category-card.vue'

export default {
  name: 'k-catalog',
  metaInfo () {
    return {
      title: 'Каталог',
      meta: [
        { vmid: 'description', name: 'description', content: 'Каталог всех категорий товаров которые доступны к преобретению' },
        { vmid: 'keywords', name: 'keywords', content: this.CATALOG ? this.FULL_KEYWORD_STRING : '' }
      ]
    }
  },
  components: {
    CategoryCard
  },
  props: ['category_name'],
  data () {
    return {
      breadcrumbs: null,
      loadingStatus: 'pending',
      showFilters: false
    }
  },
  computed: {
    ...mapGetters([
      'CATALOG'
    ]),
    FULL_KEYWORD_STRING () {
      return this.CATALOG.map(el => el.meta_keywords).join(', ')
    }
  },
  methods: {
    ...mapActions([
      'GET_CATALOG_FROM_API'
    ])
  },
  mounted () {
    this.GET_CATALOG_FROM_API()
      .then((res) => {
        if (res.data) {
          this.loadingStatus = 'success'
        }
      })
      .catch(() => {
        this.loadingStatus = 'error'
      })
  }
}
</script>

<style>

</style>
