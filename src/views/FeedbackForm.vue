<template>
  <page>
    <span slot="content">
      <form @submit.prevent="create">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">
          Feedback
        </h1>

        <button class="btn bg-gradient btn-sm text-white">
          <i class="fa fa-check"></i> Enviar
        </button>
      </div>

      <div class="w-100">
        <div class="alert alert-info">
          Deixe aqui suas avaliações, sugestões de melhorias ou funcionalidades, problemas encontrados, etc. Sua mensagem será recebida por nossa equipe :)
        </div>
      </div>

        <div class="card">
          <div class="card-body text-left">
            <input type="hidden" v-model="form.user_id" v-if="user">
            <div class="row">
              <div class="form-group col-sm-6">
                <label for="">Seu nome</label>
                <input type="text" v-model="form.name" class="form-control">
              </div>
              <div class="form-group col-sm-6">
                <label for="">Seu e-mail</label>
                <input type="email"  v-model="form.email" class="form-control">
              </div>
              <div class="form-group col-sm-12">
                <label for="">Sua mensagem<span class="text-danger">*</span></label>
                <textarea rows="5" class="form-control" required v-model="form.description"></textarea>
              </div>
            </div>
          </div>
        </div>

      </form>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";

export default {
  components: {
    Page
  },

  data() {
    return {
      form: {},
      contact : null,
      loading: false
    };
  },

  mounted() {
    this.resetForm()
  },

  computed:{
    user() {
      if(this.$root.user){
        this.setUser(this.$root.user)
      }

      return this.$root.user
    }
  },

  methods: {
    resetForm() {
      this.form = {
        user_id: null,
        name: null,
        email: null,
        description: null
      }
    },

    setUser(user) {
      this.form = {
        ...this.form,
        user_id: user.id,
        name: user.name,
        email: user.email
      }
    },

    create () {
      const data = { ...this.form }

      this.$store.dispatch('feedback/create', { data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Feedback enviado com sucesso, obrigado!",
          icon: "success",
        })

        this.resetForm()
      })
      .catch(error => {
        var message = 'Falha ao cadastrar!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    }
  },
};
</script>