import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Home from '@/views/Home'
import Registration from '@/views/Registration'
import Interests from '@/views/Interests'

Vue.use(Router)

const appTitle = 'Locavore'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: `${appTitle} - Home` }
    },
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
    },
    {
      path: '/interesses',
      name: 'Interests',
      component: Interests,
      meta: { title: `${appTitle} - Meus Interesses` }
    }
  ]
})

export default router
