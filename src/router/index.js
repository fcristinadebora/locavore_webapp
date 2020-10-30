import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Home from '@/views/Home'
import Registration from '@/views/Registration'
import Interests from '@/views/Interests'
import Addresses from '@/views/Addresses'
import Profile from '@/views/Profile'
import Products from '@/views/Products'
import ProductsForm from '@/views/ProductsForm'

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
    },
    {
      path: '/enderecos',
      name: 'Addresses',
      component: Addresses,
      meta: { title: `${appTitle} - Meus Endereços` }
    },
    {
      path: '/perfil',
      name: 'Profile',
      component: Profile,
      meta: { title: `${appTitle} - Perfil` }
    },
    {
      path: '/produtos',
      name: 'Products',
      component: Products,
      meta: { title: `${appTitle} - Produtos` }
    },
    {
      path: '/produtos/cadastro',
      name: 'ProductsFormCreate',
      component: ProductsForm,
      meta: { title: `${appTitle} - Produtos - Cadastro` }
    },
    {
      path: '/produtos/editar/:id',
      name: 'ProductsFormUpdate',
      component: ProductsForm,
      meta: { title: `${appTitle} - Produtos - Editar` }
    }
  ]
})

export default router
