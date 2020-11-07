<template>
  <div class="py-3 bg-gradient border-bottom shadow-sm">
    <div class="container-fluid d-flex flex-column flex-md-row align-items-center">
      <h5
        class="my-0 mr-md-auto pr-3 font-weight-normal w-100 col-md-4 pl-0 text-left"
      >
        <b-navbar-toggle class="bg-light d-inline" target="nav_collapse">
          <i class="fa fa-bars"></i>
        </b-navbar-toggle>
        <router-link to="/" class="pl-3 d-inline text-white no-hover">
          Locavore
        </router-link>
      </h5>

      <div class="col-12 col-md-8 p-0">
        <search></search>
      </div>
    </div>
    <b-collapse is-nav id="nav_collapse" class="container-fluid pt-3">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="btn btn-block bg-light p-0 link-color1" to="/">
          <i class="fa fa-home"></i> Início
        </b-nav-item>

        <b-nav-item
          class="btn btn-block p-0 bg-darker link-white"
          to="/login"
          v-if="!user"
        >
          Login
        </b-nav-item>
        <b-nav-item
          class="btn btn-block p-0 bg-darker link-white p-0"
          to="/cadastro"
          v-if="!user"
        >
          Cadastro
        </b-nav-item>

        <b-nav-item
          class="btn btn-block bg-darker p-0 link-white"
          to="/perfil"
          v-if="user"
        >
          Meu Perfil
        </b-nav-item>
        <b-nav-item
          class="btn btn-block bg-darker p-0 link-white"
          to="/produtos"
          v-if="user && user.is_grower"
        >
          Produtos
        </b-nav-item>
        <b-nav-item
          class="btn btn-block bg-darker p-0 link-white"
          to="/produtor/imagens"
          v-if="user && user.is_grower"
        >
          Imagens da página (produtor)
        </b-nav-item>
        <b-nav-item
          class="btn btn-block bg-darker p-0 link-white"
          to="/enderecos"
          v-if="user"
        >
          Meus Endereços
        </b-nav-item>
        <b-nav-item
          class="btn btn-block bg-darker p-0 link-white"
          to="/interesses"
          v-if="user"
        >
          Meus Interesses
        </b-nav-item>
        
        <b-nav-item
          @click="$root.logout()"
          class="btn btn-block bg-darker p-0 link-white"
          v-if="user"
        >
          <i class="fas fa-sign-out-alt"></i>Sair
        </b-nav-item>

        <hr>

        <b-nav-item
          class="btn btn-block bg-darker p-0 link-white"
          to="/feedback"
        >
          <i class="far fa-comments"></i> Feedback
        </b-nav-item>
        
      </b-navbar-nav>
    </b-collapse>
    <div class="col-12 pt-3" v-if="user && !hasAddress">
      <div class="alert alert-warning">
        <strong>
          <i class="fa fa-exclamation"></i> Atenção!
        </strong>&nbsp;
        <span v-if="!user.is_grower">
         Cadastre ao menos um endereço para resultados mais precisos. <router-link to="/enderecos">Clique aqui</router-link> para acessar.
        </span>
        <span v-if="user.is_grower">
         Cadastre ao menos um endereço para aparecer nas buscas. <router-link to="/enderecos">Clique aqui</router-link> para acessar.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/HeaderNavbarSearch'

export default {
  components: {
    Search
  },

  computed: {
    user() {
      return this.$root.user;
    },

    hasAddress() {
      const value = this.$store.getters["address/hasAddress"];

      if (value === null && this.user) {
        this.$store.dispatch("address/checkHasAddress", { params: { user_id: this.user.id }});
      }

      return value;
    },

  },

  data() {
    return {
      form: { string: "" },
    };
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
.bg-darker {
  background: linear-gradient(87deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.25));
}
</style>