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
        >
          <div class="input-group mt-2 mt-md-0 mr-0 mr-md-2 w-100 w-md-auto">
            <input
              type="text"
              class="form-control border-white"
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-light" type="button">
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
        <b-nav-item class="btn btn-block bg-light p-0 link-color1" href="/">
          <i class="fa fa-home"></i> Início
        </b-nav-item>

        <b-nav-item class="btn btn-block border-color1 p-0 link-white" href="/login" v-if="!user">
          Login
        </b-nav-item>
        <b-nav-item class="btn btn-block border-color1 p-0 link-white p-0" href="/cadastro" v-if="!user">
          Cadastro
        </b-nav-item>


        <b-nav-item class="btn btn-block border-color1 p-0 link-white" href="/perfil" v-if="user">
          Meu Perfil
        </b-nav-item>
        <b-nav-item class="btn btn-block border-color1 p-0 link-white" href="/enderecos" v-if="user">
          Meus Endereços
        </b-nav-item>
        <b-nav-item class="btn btn-block border-color1 p-0 link-white" href="/login" v-if="user">
          Produtores Favoritos
        </b-nav-item>
        <b-nav-item class="btn btn-block border-color1 p-0 link-white" href="/interesses" v-if="user">
          Meus Interesses
        </b-nav-item>

        <b-nav-item @click="$root.logout()" class="btn btn-block bg-color1 border-white p-0 link-white" v-if="user">
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
      const user = this.$store.getters["user/user"]
      
      if (user === null) {
        this.$store.dispatch("user/authenticated")
      }

      return user;
    },
  },
};
</script>