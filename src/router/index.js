import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Registration from '@/views/Registration'

Vue.use(Router)

const appTitle = 'Locavore'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: `${appTitle} - Login` }
    },
    {
      path: '/cadastro',
      name: 'Registration',
      component: Registration,
      meta: { title: `${appTitle} - Cadastro` }
    }
  ]
})

export default router
