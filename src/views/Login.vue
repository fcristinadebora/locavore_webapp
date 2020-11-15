<template>
  <div>
    <header-navbar class="header-relative"></header-navbar>
    <div class="w-100 full-height bg-vegetables"></div>

    <div class="container full-height pt-4 pb-4">
      <div class="row justify-content-center full-height align-items-center">
        <div class="col-12 col-md-6 col-lg-5 text-center">
          <h4 class="mb-4">Bem-vindo(a) ao Locavore!</h4>

          <div class="card border-color1">
            <form @submit.prevent="login">
              <div class="card-header text-white bg-color1">
                Acesse sua conta
              </div>
              <div class="card-body">
                <form action="">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="E-mail"
                          v-model="form.email"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Senha"
                          v-model="form.password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-footer">
                <div class="row align-items-center">
                  <div class="col-sm-6 text-left">
                    <router-link to="/cadastro"
                      >Ainda não sou cadastrado</router-link
                    >
                  </div>

                  <div class="col-sm-6 text-right">
                    <button
                      class="btn bg-gradient text-white"
                      type="submit"
                      :disabled="loading"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
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
        email: "",
        password: "",
      };
    },

    login() {
      this.errors = {};

      this.loading = true;
      this.$store
        .dispatch("user/login", { data: this.form })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("authToken", response.data.token);
          }

          this.$store.dispatch("user/authenticated")

          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response.data && error.response.data.message) {
            this.$swal.fire({
              title: "Oops!",
              text: error.response.data.message,
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
.header-relative{
  position: relative;
  width: 100%;
  z-index: 9;
}
</style>