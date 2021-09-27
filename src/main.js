import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'
import VueSlider from 'vue-slider-component'
import ClientOnly from 'vue-client-only'
import router from './router'
import store from './vuex/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-slider-component/theme/default.css'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'hooper/dist/hooper.css'
import './assets/css/style.css'
import './assets/scss/style.scss'
import vuetify from './plugins/vuetify'

const VueCarousel = require('vue-carousel')
VueCarousel.default.install(Vue)

const VueGallery = require('vue-gallery')
Vue.component('vue-gallery', VueGallery)

const VueScrollTo = require('vue-scrollto')
Vue.config.productionTip = false
Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios.create({
      // baseURL: 'http://127.0.0.1:8000/api/v1/' // FOR DEV!
      baseURL: 'https://kliogem.ru:8079/api/v1/' // FOR PROD!
    })
  }
})
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
library.add(faRubleSign)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('VueSlider', VueSlider)
Vue.component('ClientOnly', ClientOnly)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 700,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
  store
}).$mount('#app')
