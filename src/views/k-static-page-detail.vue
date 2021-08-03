<template>
  <b-row class="content-section">
    <b-col cols="10" offset-md="1">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>{{ page.name }}</h1>
      <b-row v-if="page.content" class="bottom-spaced">
        <b-col cols="12" v-html="page.content"></b-col>
      </b-row>
      <p v-else>К сожалению, данная страница находится в разработке.</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'k-static-page-detail',
  metaInfo () {
    return {
      title: this.page ? this.page.meta_title : '',
      meta: [
        { vmid: 'description', name: 'description', content: this.page ? this.page.meta_description : '' },
        { vmid: 'keywords', name: 'keywords', content: this.page ? this.page.meta_keywords : '' }
      ]
    }
  },
  props: ['page_name'],
  data () {
    return {
      page: null,
      pageStatus: 'pending'
    }
  },
  mounted () {
    this.do_axios()
  },
  watch: {
    page_name (newVal) {},
    $route (to, from) {
      this.do_axios()
    }
  },
  methods: {
    getBreadcrumbs () {
      return [
        { text: 'Главная', to: { name: 'home' } },
        { text: this.page.name, active: true }
      ]
    },
    do_axios (newVal) {
      this.$axios
        .get(`/general/pages/${this.page_name}/detail`)
        .then(response => {
          this.page = response.data
          this.breadcrumbs = this.getBreadcrumbs()
        })
    }
  }
}
</script>

<style>

</style>
