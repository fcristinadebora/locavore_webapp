<template>
  <page>
    <span slot="content">
      <form @submit.prevent="save">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">
          Meus endereços - Contatos
          <span class="text-sm">
            <i class="fa fa-angle-right"></i> {{actionStr}}</span
          >
        </h1>

        <div>
          <router-link :to="`/enderecos/${addressId}/contatos`" class="btn btn-warning btn-sm mr-2">
            <i class="fa fa-times"></i> Cancelar
          </router-link>

          <button class="btn bg-gradient btn-sm text-white">
            <i class="fa fa-check"></i> Salvar
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body text-center" v-if="$route.params.id && !this.contact">
          <i class="fa fa-spinner fa-pulse"></i> Carregando...
        </div>
        <div class="card-body text-left" v-if="!$route.params.id || ($route.params.id && this.contact)">
          <div class="row">
            <div class="form-group col-sm-4">
              <label for="">Tipo<span class="text-danger">*</span></label>
              <select class="form-control" v-model="form.type" required>
                <option value="">Selecione</option>
                <option value="phone">Telefone</option>
                <option value="email">E-mail</option>
                <option value="whatsapp">Whatsapp</option>
                <option value="other">Outros</option>
              </select>
            </div>
            <div class="form-group col-sm-8">
              <label for="">Valor<span class="text-danger">*</span></label>
              <input type="text" v-if="form.type == 'phone' || form.type == 'whatsapp'" v-model="form.value" class="form-control" v-mask="'(##) #####-####'" minlength="14" maxlength="15" required />
              <input type="email" v-if="form.type == 'email'" v-model="form.value" class="form-control" required />
              <input type="text" v-if="form.type == 'other'" v-model="form.value" class="form-control" required />
              <input type="text" v-if="form.type == ''" disabled v-model="form.value" class="form-control" required />
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