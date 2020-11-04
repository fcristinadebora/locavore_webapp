<template>
  <page>
    <span slot="content">
      <form @submit.prevent="save">
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
            <div class="row">
              <div class="form-group col-sm-6">
                <label for="">Seu nome</label>
                <input type="text" name="" id="" class="form-control">
              </div>
              <div class="form-group col-sm-6">
                <label for="">Seu e-mail</label>
                <input type="email" name="" id="" class="form-control">
              </div>
              <div class="form-group col-sm-12">
                <label for="">Sua mensagem<span class="text-danger">*</span></label>
                <textarea rows="5" class="form-control"></textarea>
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

    if(this.$route.params.id){
      this.getItemData()
    }
  },

  computed:{
    actionStr () {
      return this.$route.params.id ? 'Editar' : 'Cadastro'
    },
    addressId () {
      return this.$route.params.addressId
    }
  },

  methods: {
    resetForm() {
      this.form = {
        address_id: this.addressId,
        id: this.$route.params.id ? this.$route.params.id : null,
        type: '',
        value: null
      }
    },

    getItemData(){
      this.$store.dispatch('contact/getById', { id:this.form.id, params: { with_tags: true } })
      .then((response) => {
        this.contact = response.data
        this.form = {
          ...this.form,
          address_id: this.contact.address_id,
          id: this.contact.id,
          type: this.contact.type,
          value: this.contact.value
        }
      })
      .catch(error => {
        var message = 'Falha ao carregar dados!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },

    save() {
      if(this.form.id){
        this.update()  
      }else{
        this.create()
      }
      
    },

    getData () {
      var data = {
        ...this.form
      }

      return data
    },

    create () {
      const data = this.getData()

      this.$store.dispatch('contact/create', { data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Item cadastrado com sucesso!",
          icon: "success",
        })

        this.$router.push(`/enderecos/${this.addressId}/contatos`)
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
    },

    update () {
      const data = this.getData()

      this.$store.dispatch('contact/update', { id: this.form.id, data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Item atualizado com sucesso!",
          icon: "success",
        })

        this.$router.push(`/enderecos/${this.addressId}/contatos`)
      })
      .catch(error => {
        var message = 'Falha ao atualizar item!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },

    selectLocation(location) {
      this.form.lat = location.lat
      this.form.long = location.long
    }
  },
};
</script>