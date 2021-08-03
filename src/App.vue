<template>
  <div id="app">
    <header>
      <b-container fluid>
        <b-row class="mb-md-3">
          <b-col id="burger-menu" order="2" class="mb-3 mb-md-0 d-xl-none" @click="burgerMenuActive = !burgerMenuActive" :class="{ change: burgerMenuActive }">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </b-col>
          <div id="mobile-menu" v-if="HEADER_MENU && burgerMenuActive">
            <b-nav justified>
              <div class="mobile-icons d-md-none">
                <b-link :to="{ name: 'profile' }" v-if="CURRENT_USER">
                  <div class="nav-icons" >
                    <img src="@/assets/icons/user.svg" class="icon-h-lg" alt="Личный кабинет">
                    <p class="text-center">Личный кабинет</p>
                  </div>
                </b-link>
                 <b-link :to="{ name: 'favorites' }" v-else>
                  <div class="nav-icons" >
                    <img src="@/assets/icons/star_yellow.svg" class="icon-h-lg" alt="Избранное">
                    <p class="text-center">избранное</p>
                  </div>
                </b-link>
                <b-link to="/basket">
                  <div class="nav-icons" >
                    <img src="@/assets/icons/shopcart.svg" class="icon-h-lg" alt="Корзина">
                    <b-badge v-if="BASKET && BASKET.products.length" pill variant="light" class="basket-badge">
                      {{ BASKET.products.length }}
                    </b-badge>
                    <p class="text-center">корзина</p>
                  </div>
                </b-link>
                <div v-if="CURRENT_USER" class="nav-icons" @click="logout()">
                  <img src="@/assets/icons/door.svg" class="icon-h-lg" alt="Выйти">
                  <p class="text-center">выйти</p>
                </div>
                <div v-else class="nav-icons" v-b-modal.modal-login>
                  <img src="@/assets/icons/user.svg" class="icon-h-lg" alt="Войти">
                  <p class="text-center">войти</p>
                </div>
              </div>
              <b-col cols="12" lg v-for="category in HEADER_MENU.items" :key="category.id" class="text-center text-lg-left mb-3 mb-lg-0">
                <b-link v-b-toggle="`collapse-${category.id}`" class="mobile-menu-category">{{ category.name.toLowerCase() }}</b-link>
                <b-collapse :id="`collapse-${category.id}`" accordion="mobile-menu-accordion" class="d-lg-none">
                  <ul class="mobile-menu-list">
                    <li v-for="subcat in category.children" :key="subcat.id">
                      <b-link :to="`/${subcat.path}`">{{ subcat.name.toLowerCase() }}</b-link>
                    </li>
                  </ul>
                </b-collapse>
                <ul class="mobile-menu-list d-none d-lg-block">
                  <li v-for="subcat in category.children" :key="subcat.id">
                    <b-link :to="`/${subcat.path}`">{{ subcat.name.toLowerCase() }}</b-link>
                  </li>
                </ul>
              </b-col>
            </b-nav>
          </div>
          <div class="white-line"></div>
          <b-col cols="12" md="5" xl="4" order-md="2" order-xl="1" class="d-none d-md-block">
            <b-row class="contacts-row">
              <b-col cols="12">
                <div class="contact-item contact-item-0">
                  <b-dropdown
                    id="dropdown-contacts"
                    text="Наши адреса"
                    no-caret
                  >
                    <b-dropdown-item
                      v-for="contact in CONTACTS"
                      :key="contact.id"
                    >
                      <b-link
                        :to="{ name: 'contacts', params: { current: contact.slug } }"
                        v-scroll-to="{ el: `#${contact.slug}` }"
                      >
                        {{ contact.name }}<br><span class="dropdown-phone">{{ contact.phones[0].phone }}</span>
                      </b-link>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div
                  v-for="contact in CONTACTS"
                  :key="contact.id"
                  :class="`contact-item contact-item-${contact.id}`"
                >
                  <b-link
                    :to="{ name: 'contacts', params: { current: contact.slug } }"
                    v-scroll-to="{ el: `#${contact.slug}` }"
                  >
                    <h4>{{ contact.name }}</h4>
                    <p>
                      <img
                        src="@/assets/icons/phone.svg"
                        class="icon-sm"
                        :alt="`Телефон магазина ${contact.name}`"
                      >
                      {{ contact.phones[0].phone }}
                    </p>
                  </b-link>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" id="subheader" v-if="SUBHEADER_MENU">
                <div
                  class="header-info-link"
                  v-for="item in SUBHEADER_MENU.items"
                  :key="item.id"
                >
                  <b-link :href="`/${item.path}`" class="red">
                    <p class="red">
                      <img
                        :src="item.icon"
                        v-if="item.icon"
                        class="icon-h-md"
                        :alt="`Сайт Клио | ${item.name}`"
                      >
                      {{ item.name }}
                    </p>
                  </b-link>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" xl="4" order="1" order-xl="2" class="text-center mb-md-3">
            <b-link to="/">
              <img src="@/assets/img/klio_logo.svg" alt="Клио" id="main-logo">
            </b-link>
          </b-col>
          <b-col cols="12" md=7 xl="4" order-md="3" class="text-right d-none d-md-block">
            <b-button
              squared
              class="btn-red"
              v-b-modal.modal-city
            >
              <img
                src="@/assets/icons/pin_white.svg"
                class="icon-sm"
                alt="Местоположение пользователя"
              >
              <span v-if="CURRENT_CITY !== null">{{CURRENT_CITY}}</span>
              <b-icon v-else icon="three-dots" animation="cylon"></b-icon>
              </b-button>
            <div class="float-right">
              <div v-if="CURRENT_USER" class="float-right nav-icons" @click="logout()">
                <img src="@/assets/icons/door.svg" class="icon-h-lg" alt="Выйти">
                <p class="text-center">выйти</p>
              </div>
              <div v-else class="float-right nav-icons" v-b-modal.modal-login>
                <img src="@/assets/icons/user.svg" class="icon-h-lg" alt="Войти">
                <p class="text-center">войти</p>
              </div>
              <b-link to="/basket">
                <div class="float-right nav-icons" >
                  <img src="@/assets/icons/shopcart.svg" class="icon-h-lg" alt="Корзина">
                  <b-badge v-if="BASKET && BASKET.products.length" pill variant="light" class="basket-badge">
                    {{ BASKET.products.length }}
                  </b-badge>
                  <p class="text-center">корзина</p>
                </div>
              </b-link>
              <b-link :to="{ name: 'profile' }" v-if="CURRENT_USER">
                <div class="float-right nav-icons" >
                  <img src="@/assets/icons/user.svg" class="icon-h-lg" alt="Личный кабинет">
                  <p class="text-center">Личный<br /> кабинет</p>
                </div>
              </b-link>
              <b-link :to="{ name: 'favorites' }" v-else>
                <div class="float-right nav-icons" >
                  <img src="@/assets/icons/star_yellow.svg" class="icon-h-lg" alt="Избранное">
                  <p class="text-center">избранное</p>
                </div>
              </b-link>
            </div>
          </b-col>
        </b-row>
        <b-row id="search-field">
          <b-col cols="12" lg="10" offset-lg="1" xl="8" offset-xl="2">
            <b-form @submit.prevent="search" method="GET">
              <b-input-group size="lg">
                <b-form-input v-if="!searchByTags && !searchByArticle" v-model.trim="$v.query.$model" placeholder="введите наименование товара или артикул" class="form-input"></b-form-input>
<!--                <b-form-tags-->
<!--                  v-if="searchByTags"-->
<!--                  v-model.trim="$v.queryTags.$model"-->
<!--                  separator=","-->
<!--                  placeholder="введите теги, разделяя запятыми"-->
<!--                  remove-on-delete-->
<!--                  no-add-on-enter-->
<!--                  class="form-input"-->
<!--                ></b-form-tags>-->
                <b-form-input v-if="searchByArticle" v-model.trim="$v.queryArticle.$model" placeholder="введите артикул" class="form-input"></b-form-input>
                <b-input-group-append is-text id="tags-search-wrapper">
<!--                  <input squared type="checkbox" id="tags-search" v-model="searchByTags" size="lg" aria-label="search by tags"> <label for="tags-search">по тегам</label>-->
                  <input squared type="checkbox" id="article-search" v-model="searchByArticle" size="lg" aria-label="search by tags"> <label for="tags-search">по артикулу</label>
                </b-input-group-append>
                <b-input-group-append>
                  <b-button squared size="lg" class="btn-yellow d-none d-md-block" type="submit">Найти</b-button>
                </b-input-group-append>
              </b-input-group>
              <b-button squared size="lg" class="btn-yellow d-md-none mt-2 btn-block" type="submit">Найти</b-button>
            </b-form>
            <p v-if="submitStatus == 'ERROR'" class="form-error">Введите хотя бы один символ для поиска.</p>
          </b-col>
        </b-row>
        <b-row id="top-menu" v-if="HEADER_MENU" class="d-none d-xl-block">
          <b-col cols="12" id="top-menu-container">
            <b-nav justified>
              <b-nav-item v-for="(category, cIndex) in HEADER_MENU.items" :key="category.id">
                <div class="dropdown b-dropdown btn-group" :class="{ active: cIndex === showDropdown }" @mouseover="showDropdown = cIndex" @mouseleave="showDropdown = null">
                  <b-button aria-haspopup="true" aria-expanded="false" type="button" :to="`/${category.path}`"
                  class="btn dropdown-toggle dropdown-toggle-no-caret">{{ category.name }}</b-button>
                  <ul role="menu" tabindex="-1" class="dropdown-menu" ref="dropdownItem">
                    <b-row align-h="around" class="bottom-spaced" style="padding: 0 10px;" v-for="(section, index) in getSections(category)" :key="index">
                      <b-col class="dropdown-category-container" v-for="subcat in section" :key="subcat.id">
                        <b-link :to="`/${subcat.path}`"><p class="dropdown-category-header">{{ subcat.name }}</p></b-link>
                        <ul class="dropdown-category-list">
                          <li v-for="subsubcat in subcat.children" :key="subsubcat.id">
                            <b-link :to="`/${subsubcat.path}`">{{ subsubcat.name }}</b-link>
                          </li>
                        </ul>
                      </b-col>
                    </b-row>
                  </ul>
                </div>
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </b-container>
    </header>
    <div id="main-content">
      <b-container fluid>
        <router-view/>
      </b-container>
    </div>
    <footer>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="10" lg="6" xl="4" offset-md="1" offset-xl="0" order="3" order-lg="2" order-xl="1">
            <b-row v-if="SITE_SETTINGS">
              <b-col cols="12" lg="10" class="footer-info" v-html="SITE_SETTINGS.description"></b-col>
            </b-row>
            <b-row id="copyright-blk">
              <b-col cols="12" class="text-center text-md-left">
                <p>info@kliogem.ru</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="10" xl="4" offset-md="1" offset-xl="0" order="1" class="mb-md-5">
            <b-row v-if="FOOTER_MENU">
              <b-col cols="12" md="4" class="mb-4 mb-md-0 text-center text-md-left" v-for="(category, index) in FOOTER_MENU.items" :key="category.id">
                <p class="footer-subtitle" v-b-toggle="`collapse-${index}`">{{ category.name }}</p>
                <b-collapse :id="`collapse-${index}`" accordion="footer-menu-accordion" class="d-md-none">
                  <ul class="footer-menu">
                    <li v-for="subcat in category.children" :key="subcat.id">
                      <b-link :to="`/${subcat.path}`">{{ subcat.name }}</b-link>
                    </li>
                    <li v-if="index === 0">
                      <img src="@/assets/img/mastercard.svg" alt="Mastercard" class="card-systems">
                      <img src="@/assets/img/visa.svg" alt="Visa" class="card-systems">
                    </li>
                  </ul>
                </b-collapse>
                <ul class="footer-menu d-none d-md-block">
                  <li v-for="subcat in category.children" :key="subcat.id">
                    <b-link :to="`/${subcat.path}`">{{ subcat.name }}</b-link>
                  </li>
                  <li v-if="index === 0">
                    <img src="@/assets/img/mastercard.svg" alt="Mastercard" class="card-systems">
                    <img src="@/assets/img/visa.svg" alt="Visa" class="card-systems">
                    <img src="@/assets/img/mir-logo.svg" alt="MIR" class="card-systems">
                    <img src="@/assets/img/paypass.svg" alt="Paypass" class="card-systems">
                  </li>
                </ul>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="10" lg="4" xl="3" offset-md="1" offset-lg="0" offset-xl="1" order="2" order-lg="3" class="footer-subscribe-blk mb-md-3">
            <p class="light-upper">
              <img src="@/assets/icons/mail-icon.svg" alt="subscribe on klio"> подписаться на
              <img src="@/assets/img/kliologoyellowreddiamond.svg" alt="Klio" id="footer-logo">
            </p>
            <b-form @submit.prevent="subscribe" method="POST">
              <b-input-group size="lg" class="footer-subscribe-input">
                <b-form-input v-model="subscriptionEmail" placeholder="e-mail" :class="['form-input', { 'bg-error' : (err && err.email) }]"></b-form-input>
                <b-input-group-append>
                  <b-button squared size="lg" class="btn footer-btn-yellow" type="submit">
                    <img src="@/assets/icons/arrow_grey.svg" alt="subscribe">
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form>
            <p class="light-upper">Клио в соцсетях:</p>
            <p>
              <a v-for="social in SOCIALS" :key="social.id" :href="social.url"><img :src="social.img" :alt="social.name" class="social-icon"></a>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </footer>

    <b-modal id="modal-city" hide-footer>
      <p>Ваш город - <span class="red">
        <span v-if="CURRENT_CITY !== null">{{CURRENT_CITY}}</span>
        <span v-else>...</span>
      </span>?</p>
      <b-button
        squared
        size="lg"
        class="btn-yellow bottom-spaced"
        @click="$bvModal.hide('modal-city')"
      >
        да
      </b-button>
      <b-link v-if="!city.changing" @click="openChangeCity"><p>изменить</p></b-link>
      <div v-else>
        <b-input-group v-if="CITIES.length !== 0">
          <label for="field-city"></label>
          <vue-bootstrap-typeahead
            v-model="city.value"
            ref="typeahead"
            :data="citiesFiltered"
            :serializer="s => s.text"
            :minMatchingChars=1
            inputClass="form-input"
            id="field-city"
            class="w-100"
            placeholder="Выберите город"
            @hit="changeCity($event)"
          />
        </b-input-group>
        <b-icon v-if="city.loading" icon="three-dots" animation="cylon"></b-icon>
      </div>
    </b-modal>

    <login />

    <b-modal id="modal-subscribe" hide-footer>
      <p>Спасибо!</p>
      <p>Вы успешно подписались на рассылку.</p>
    </b-modal>

    <b-modal id="modal-amount-error" hide-footer>
      <p>В таком количестве товара нет на складе.
        Попробуйте заказать меньше или<br /> <b-link class="link-yellow" @click="goToContacts()">свяжитесь с нами</b-link></p>
    </b-modal>
  </div>
</template>

<script>
import { email, required, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

import Login from '../src/components/k-login.vue'

export default {
  name: 'App',
  metaInfo () {
    return {
      title: 'Продажа ювелирного инструмента, упаковки и оборудования',
      titleTemplate: '%s | Интернет-магазин КЛИО',
      meta: [
        { vmid: 'description', name: 'description', content: 'Интернет-магазин Клио - продажа ювелирного инструмента и оборудования, ювелирной упаковки оптом и в розницу, на заказ, зуботехническое оборудование. Доставка по России.' },
        { vmid: 'keywords', name: 'keywords', content: 'ювелирное, оборудование, инструмент, для ювелиров,зуботехническое оборудование, ювелирная упаковка, геммологическое оборудование, оборудование для ломбарда' }
      ]
    }
  },
  components: {
    Login
  },
  data () {
    return {
      burgerMenuActive: false,
      err: null,
      searchByTags: false,
      searchByArticle: this.$route.query.article !== undefined,
      showDropdown: null,
      submitStatus: 'PENDING',
      subscriptionEmail: null,
      query: this.$route.query.text,
      queryTags: this.$route.query.tags,
      queryArticle: this.$route.query.article,
      city: {
        value: 'Москва',
        loading: true,
        changing: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'BASKET',
      'CONTACTS',
      'CURRENT_USER',
      'FOOTER_MENU',
      'HEADER_MENU',
      'SITE_SETTINGS',
      'SOCIALS',
      'SUBHEADER_MENU',
      'CURRENT_CITY',
      'CITIES'
    ]),
    citiesFiltered () {
      return this.CITIES.filter(el => el.text !== null)
    }
  },
  methods: {
    ...mapActions([
      'CREATE_SUBSCRIPTION',
      'GET_ACTIVE_ORDER_FROM_API',
      'GET_BASKET_FROM_API',
      'GET_CONTACTS_FROM_API',
      'GET_CURRENT_USER_FROM_API',
      'GET_FAVORITES_FROM_API',
      'GET_MENUS_FROM_API',
      'GET_SITE_SETTINGS_FROM_API',
      'GET_SOCIALS_FROM_API',
      'GET_CITIES_FROM_API',
      'UPDATE_USER',
      'LOGOUT'
    ]),
    changeCity (city) {
      this.$store.commit('SET_CURRENT_CITY', city.text)
      if (this.CURRENT_USER !== null) {
        this.UPDATE_USER(
          {
            username: this.CURRENT_USER.username,
            city: city.value
          }
        )
      }
      this.city.changing = false
      this.$bvModal.hide('modal-city')
    },
    openChangeCity () {
      this.city.loading = true
      this.city.changing = true
      this.GET_CITIES_FROM_API(() => {
        this.city.loading = false
      })
    },
    getSections (category) {
      var results = []
      var temparray = []
      var j = category.children.length
      var k = 0
      var chunk = 8
      for (let i = 0; i < j; i += chunk) {
        temparray = category.children.slice(i, i + chunk)
        results[k] = temparray
        k = k + 1
      }
      return results
    },
    goToContacts () {
      this.$bvModal.hide('modal-amount-error')
      this.$router.push({ name: 'contacts' })
    },
    logout () {
      this.LOGOUT()
        .then((res) => {
          this.GET_ACTIVE_ORDER_FROM_API()
          this.GET_BASKET_FROM_API()
        })
    },
    search () {
      if (this.searchByTags) {
        this.$v.$touch()
        if (this.$v.queryTags.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK'
          this.$router.push('/search?tags=' + this.queryTags)
        }
      } else if (this.searchByArticle) {
        this.$v.$touch()
        if (this.$v.queryArticle.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK'
          this.$router.push('/search?article=' + this.queryArticle)
            .catch(error => { if (error.name !== 'NavigationDuplicated') { throw error } })
        }
      } else {
        this.$v.$touch()
        if (this.$v.query.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK'
          this.$router.push('/search?text=' + this.query)
            .catch(error => { if (error.name !== 'NavigationDuplicated') { throw error } })
        }
      }
    },
    // showDropdown (e) {
    //   console.log(e.target)
    //   // event.target.getElementsByClassName('dropdown-menu').classList.add('active')
    //   event.target.$refs.dropdownItem.visible = true;
    // },
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
    this.GET_CURRENT_USER_FROM_API()
    this.GET_BASKET_FROM_API()
    this.GET_CONTACTS_FROM_API()
    this.GET_MENUS_FROM_API()
    this.GET_FAVORITES_FROM_API()
    this.GET_SITE_SETTINGS_FROM_API()
    this.GET_SOCIALS_FROM_API()
  },
  validations: {
    query: {
      required
    },
    queryTags: {
      required
    },
    queryArticle: {
      required,
      numeric
    },
    subscription: {
      email,
      required
    }
  },
  watch: {
    $route (to, from) {
      this.showDropdown = null
    }
  }
}
</script>

<style>

</style>
