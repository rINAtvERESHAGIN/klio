import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

import ArticleNewsDetail from '../views/k-article-news-detail.vue'
import ArticleNewsList from '../views/k-article-news-list.vue'
import Contacts from '../views/k-contacts.vue'
import Home from '../views/k-home.vue'
import SearchResults from '../views/k-search-results.vue'
import StaticPageDetail from '../views/k-static-page-detail.vue'
import PageNotFound from '../views/k-page-not-found.vue'
import Profile from '../views/k-profile.vue'

// Shop views
import Basket from '../views/shop/k-basket.vue'
import Catalog from '../views/shop/k-catalog.vue'
import CategoryList from '../views/shop/k-category-list.vue'
import Favorites from '../views/shop/k-favorites.vue'
import OrderProcess from '../views/shop/k-order-process.vue'
import OrderSuccess from '../views/shop/k-order-success.vue'
import OrderPaymentResult from '../views/shop/k-order-payment-result.vue'
import Orders from '../views/shop/k-orders.vue'
import SpecialList from '../views/shop/k-special-list.vue'
import SpecialDetail from '../views/shop/k-special-detail.vue'
import ProductDetail from '../views/shop/k-product-detail.vue'
import ProductList from '../views/shop/k-category-products-list.vue'
import BrandProductList from '../views/shop/k-brand-products-list.vue'
import NewProductList from '../views/shop/k-new-products-list.vue'

// Registration views
import Activation from '../views/registration/k-activation.vue'
import PasswordChangeRequest from '../views/registration/k-password-change-request.vue'
import PasswordReset from '../views/registration/k-password-reset.vue'
import Registration from '../views/registration/k-registration.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticleNewsList
  },
  {
    path: '/articles/:article_name',
    name: 'article-detail',
    component: ArticleNewsDetail
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/catalog/categories/:category_name',
    name: 'categories',
    component: CategoryList,
    props: true
  },
  {
    path: '/catalog/categories/:category_name/products',
    name: 'category-products',
    component: ProductList,
    props: true
  },
  {
    path: '/catalog/brand/:brand_name/products',
    name: 'brand-products',
    component: BrandProductList,
    props: true
  },
  {
    path: '/new-products',
    name: 'new-products',
    component: NewProductList,
    props: true
  },
  {
    path: '/catalog/products/:product_name',
    name: 'product-detail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    props: true
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },
  {
    path: '/info/:page_name',
    name: 'static-page',
    component: StaticPageDetail,
    props: true
  },
  {
    path: '/news',
    name: 'news',
    component: ArticleNewsList
  },
  {
    path: '/news/:news_name',
    name: 'news-detail',
    component: ArticleNewsDetail
  },
  {
    path: '/order/process',
    name: 'orderProcess',
    component: OrderProcess
  },
  {
    path: '/order/process/success',
    name: 'order-success',
    component: OrderSuccess,
    props: route => route.query
  },
  {
    path: '/order/:orderId(\\d+)/payment/:status(success|fail)',
    component: OrderPaymentResult,
    props: true
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/pass-change',
    name: 'password-change',
    component: PasswordChangeRequest
  },
  {
    path: '/password/:user_id/set/:reset_code',
    name: 'PasswordReset',
    component: PasswordReset,
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'register',
    component: Registration
  },
  {
    path: '/register/activate/:activation_code',
    name: 'activate',
    component: Activation,
    props: true
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/specials',
    name: 'specials',
    component: SpecialList
  },
  {
    path: '/specials/:special_name',
    name: 'special-detail',
    component: SpecialDetail,
    props: true
  },
  {
    path: '*',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.path !== from.path) {
      return { x: 0, y: 0 }
    }
  }
})

export default router
