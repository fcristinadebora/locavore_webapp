<template>
  <div>
    <header-navbar class="header-absolute"></header-navbar>
    <div class="w-100 full-height bg-vegetables"></div>

    <div class="container full-height">
      <div class="row justify-content-center full-height align-items-center">
        <div class="col-12 text-center col-md-6 col-lg-5">
          <h4 class="mb-4">Bem-vindo(a) ao Locavore!</h4>

          <form @submit.prevent="register()">
            <div class="card border-color1">
              <div class="card-header text-white  bg-color1">Cadastre-se</div>
              <div class="card-body text-left">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.name"
                        placeholder="Nome"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        v-model="form.email"
                        placeholder="E-mail"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        v-model="form.password"
                        placeholder="Senha"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        v-model="form.confirm"
                        placeholder="Confirmar senha"
                        required
                      />
                      <span class="text-danger" v-if="errors.confirm"
                        >A senha e a confirmação devem ser iguais!</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="row align-items-center">
                  <div class="col-sm-6 text-left">
                    <router-link to="/login">Já possuo cadastro</router-link>
                  </div>

                  <div class="col-sm-6 text-right">
                    <button
                      class="btn bg-gradient text-white"
                      type="submit"
                      :disabled="loading"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNavbar from '@/components/HeaderNavbar'

export default {
  components: {
    HeaderNavbar
  },

  data() {
    return {
      loading: false,
      form: {},
      errors: {},
    };
  },

  mounted() {},

  methods: {
    resetForm() {
      this.form = {
        name: "",
        email: "",
        password: "",
        confirm: "",
      };
    },

    register() {
      this.errors = {};

      if (this.form.password !== this.form.confirm) {
        this.errors.confirm = true;
        return false;
      }

      this.loading = true;
      this.$store
        .dispatch("user/register", { data: this.form })
        .then(response => {
          if(response.data.token){
            localStorage.setItem('authToken', response.data.token);
          }

          this.$store.dispatch("user/authenticated")

          this.$router.push('/')
        })
        .catch((error) => {
          if (
            error.response.data &&
            error.response.data.email &&
            error.response.data.email[0] == "The email has already been taken."
          ) {
            this.$swal.fire({
              title: "Oops!",
              text: "O endereço de e-mail informado já está em uso!",
              icon: "error",
            });

            return false;
          }

          this.$swal.fire({
            title: "Oops!",
            text: "Ocorreu um erro. Por favor, tente novamente.",
            icon: "error",
          });
          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-absolute{
  position: absolute;
  width: 100%;
  z-index: 9;
}
</style>