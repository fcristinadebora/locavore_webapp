import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2'
import wysiwyg from "vue-wysiwyg"
import Multiselect from 'vue-multiselect'
import VueMask from 'v-mask'
import moment from 'moment'
 
import 'sweetalert2/dist/sweetalert2.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import "vue-wysiwyg/dist/vueWysiwyg.css"
import "vue-multiselect/dist/vue-multiselect.min.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(VueMask)
Vue.use(wysiwyg, {
  hideModules: {
    "image": true,
    "code": true,
    "justifyLeft": true,
    "justifyCenter": true,
    "justifyRight": true,
    "headings": true,
    "table": true
  },
})
Vue.component('multiselect', Multiselect)

Vue.filter('toReais', function (value) {
    if (!value) return ''
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
})

Vue.filter('formatDate', function (value, format) {
  if (value && moment(String(value)).isValid()) {
    return moment(String(value)).format(format)
  }

  return value
})

Vue.filter('toKm', function (value) {
    if (value === null) return ''
    if (isNaN(parseFloat(value))) return value

    return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 , style: 'decimal' }) + ' Km'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  data () {
    return {
      geoLocation: null,
      searchParams: null,
      searchForm: null
    }
  },
  computed: {
    user () {
      const user = store.getters["user/user"]

      if (user === null) {
        this.$store.dispatch("user/authenticated")
      }

      return user;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken")
      this.$store.dispatch("user/authenticated")
      router.push('/login')
    }
  }

}).$mount('#app')
