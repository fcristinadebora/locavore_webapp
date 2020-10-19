import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
 
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
