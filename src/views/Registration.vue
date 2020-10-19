<template>
  <div>
    <div class="w-100 full-height bg-vegetables"></div>

    <div class="container-fluid full-height">
      <div class="row justify-content-center full-height align-items-center">
        <div class="col-12 text-center col-md-6 col-lg-4">
          <h4 class="mb-4">Bem-vindo(a) ao Locavore!</h4>

          <form @submit.prevent="register()">
            <div class="card border-success">
              <div class="card-header text-white bg-success">
                Cadastre-se
              </div>
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
                      <span class="text-danger" v-if="errors.confirm">A senha e a confirmação devem ser iguais!</span>
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
                      class="btn btn-success"
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
export default {
  data() {
    return {
      loading: false,
      form: {},
      errors: {}
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
      this.errors = {}

      if(this.form.password !== this.form.confirm){
        this.errors.confirm = true
        return false
      }

      this.loading = true
      this.$store.dispatch("user/register", { data: this.form })
        .catch(() => {
          this.$swal.fire({
            title: 'Oops!',
            text: 'Ocorreu um erro. Por favor, tente novamente.',
            icon: 'error'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
};
</script>

<style lang="scss">
.bg-vegetables {
  position: absolute;
  background: url("../assets/img/veggies.jpg");
  background-size: 10%;
  opacity: 0.1;
}
</style>
