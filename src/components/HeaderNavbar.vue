<template>
  <div class="py-3 bg-gradient border-bottom shadow-sm">
    <div class="container d-flex flex-column flex-md-row align-items-center">
      <h5
        class="my-0 mr-md-auto pr-3 font-weight-normal w-100 col-md-4 pl-0 text-left"
      >
        <b-navbar-toggle class="bg-light d-inline" target="nav_collapse">
          <i class="fa fa-bars"></i>
        </b-navbar-toggle>
        <router-link to="/"  class="pl-3 d-inline text-white no-hover"> Locavore </router-link>
      </h5>

      <div class="col-12 col-md-8 p-0">
        <form
          class="form-inline w-100 d-flex justify-content-center justify-content-md-end"
          @submit.prevent="search"
        >
          <div class="input-group mt-2 mt-md-0 mr-0 mr-md-2 w-100 w-md-auto">
            <input
              type="text"
              class="form-control border-white"
              placeholder="Buscar"
              aria-label="Buscar"
              v-model="form.search"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-light">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <b-collapse is-nav id="nav_collapse" class="container pt-3">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="btn btn-block bg-light p-0 link-color1" to="/">
          <i class="fa fa-home"></i> Início
        </b-nav-item>

        <b-nav-item class="btn btn-block border-color1 p-0 link-white" to="/login" v-if="!user">
          Login
        </b-nav-item>
        <b-nav-item class="btn btn-block border-color1 p-0 link-white p-0" to="/cadastro" v-if="!user">
          Cadastro
        </b-nav-item>


        <b-nav-item class="btn btn-block bg-darker p-0 link-white" to="/perfil" v-if="user">
          Meu Perfil
        </b-nav-item>
        <b-nav-item class="btn btn-block bg-darker p-0 link-white" to="/produtos" v-if="user && user.is_grower">
          Produtos
        </b-nav-item>
        <b-nav-item class="btn btn-block bg-darker p-0 link-white" to="/produtor/imagens" v-if="user && user.is_grower">
          Imagens da página (produtor)
        </b-nav-item>
        <b-nav-item class="btn btn-block bg-darker p-0 link-white" to="/enderecos" v-if="user">
          Meus Endereços
        </b-nav-item>
        <b-nav-item class="btn btn-block bg-darker p-0 link-white" to="/login" v-if="user">
          Produtores Favoritos
        </b-nav-item>
        <b-nav-item class="btn btn-block bg-darker p-0 link-white" to="/interesses" v-if="user">
          Meus Interesses
        </b-nav-item>

        <b-nav-item @click="$root.logout()" class="btn btn-block bg-darker p-0 link-white" v-if="user">
          <i class="fas fa-sign-out-alt"></i>Sair
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$root.user
    },
  },

  data () {
    return {
      form: {string: ''}
    }
  },

  methods: {
    search () {
      this.getGeolocation()
    },

    getGeolocation () {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.$root.geolocation = position.coords
          this.getProducts({lat: this.$root.geolocation.latitude, long: this.$root.geolocation.longitude})
        },
        error => {
          this.$swal.fire({
            title: "Autorizar geolocalização",
            text: "Por favor, autorize o serviço de geolocalização para otimizar sua busca!",
            icon: "warning",
          })
          console.log(error.message);
          this.getProducts({lat: null, long: null})
        }
     )   
    },

    getProducts (params) {
      this.$store.dispatch('product/get', {
        params: {
          ...params,
          search_string: this.form.search,
          order_by: 'distance'
        }
      })
      .then(response => {
        console.log('products', response)
      })
      .catch(error => {
        console.log('proucts', error)
      })
    }

  }
};
</script>

<style lang="scss" scoped>
.bg-darker{
  background: linear-gradient(87deg,rgba(0,0,0,0.2),rgba(0,0,0,0.25));
}
</style>