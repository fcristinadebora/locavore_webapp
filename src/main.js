import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2'
import wysiwyg from "vue-wysiwyg"
import Multiselect from 'vue-multiselect'

 
import 'sweetalert2/dist/sweetalert2.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import "vue-wysiwyg/dist/vueWysiwyg.css"
import "vue-multiselect/dist/vue-multiselect.min.css"

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueSweetalert2)
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    logout() {
      localStorage.removeItem("authToken")
      router.push('/login')
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
  }

}).$mount('#app')
