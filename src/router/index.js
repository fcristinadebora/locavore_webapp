import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Home from '@/views/Home'
import Registration from '@/views/Registration'
import Interests from '@/views/Interests'
import Addresses from '@/views/Addresses'
import AddressesForm from '@/views/AddressesForm'
import Contacts from '@/views/Contacts'
import ContactsForm from '@/views/ContactsForm'
import Profile from '@/views/Profile'
import Products from '@/views/Products'
import ProductsForm from '@/views/ProductsForm'
import ProductsImages from '@/views/ProductsImages'
import GrowerImages from '@/views/GrowerImages'
import SearchResult from '@/views/SearchResult'
import ProductDetails from '@/views/ProductDetails'
import GrowerDetails from '@/views/GrowerDetails'
import Maps from '@/views/Maps'
import FeedbackForm from '@/views/FeedbackForm'

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
      path: '/enderecos/cadastro',
      name: 'AddressesFormCreate',
      component: AddressesForm,
      meta: { title: `${appTitle} - Meus Endereços - Cadastro` }
    },
    {
      path: '/enderecos/editar/:id',
      name: 'AddressesFormUpdate',
      component: AddressesForm,
      meta: { title: `${appTitle} - Meus Endereços - Editar` }
    },
    {
      path: '/enderecos/:addressId/contatos',
      name: 'Contacts',
      component: Contacts,
      meta: { title: `${appTitle} - Meus Endereços - Contatos` }
    },
    {
      path: '/enderecos/:addressId/contatos/cadastro',
      name: 'ContactsFormCreate',
      component: ContactsForm,
      meta: { title: `${appTitle} - Meus Endereços - Contatos - Cadastro` }
    },
    {
      path: '/enderecos/:addressId/contatos/editar/:id',
      name: 'ContactsFormUpdate',
      component: ContactsForm,
      meta: { title: `${appTitle} - Meus Endereços - Contatos - Editar` }
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
    },
    {
      path: '/produtos/imagens/:id',
      name: 'ProductsImages',
      component: ProductsImages,
      meta: { title: `${appTitle} - Produtos - Imagens` }
    },
    {
      path: '/produtor/imagens',
      name: 'GrowerImages',
      component: GrowerImages,
      meta: { title: `${appTitle} - Perfil - Imagens` }
    },
    {
      path: '/busca',
      name: 'SearchResult',
      component: SearchResult,
      meta: { title: `${appTitle} - Resultados da busca` }
    },
    {
      path: '/produto/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      meta: { title: `${appTitle} - Detalhes do produto` }
    },
    {
      path: '/produtor/:id',
      name: 'GrowerDetails',
      component: GrowerDetails,
      meta: { title: `${appTitle} - Detalhes do produtor` }
    },
    {
      path: '/mapa/:type',
      name: 'Maps',
      component: Maps,
      meta: { title: `${appTitle} - Resultados da busca - Mapa` }
    },
    {
      path: '/feedback',
      name: 'FeedbackForm',
      component: FeedbackForm,
      meta: { title: `${appTitle} - Feedback` }
    }
  ]
})

export default router
