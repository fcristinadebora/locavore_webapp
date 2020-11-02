<template>
  <page>
    <span slot="content">
      <form @submit.prevent="save">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">
          Meus endereços
          <span class="text-sm">
            <i class="fa fa-angle-right"></i> {{actionStr}}</span
          >
        </h1>

        <div>
          <router-link to="/enderecos" class="btn btn-warning btn-sm mr-2">
            <i class="fa fa-times"></i> Cancelar
          </router-link>

          <button class="btn bg-gradient btn-sm text-white">
            <i class="fa fa-check"></i> Salvar
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body text-center" v-if="$route.params.id && !this.address">
          <i class="fa fa-spinner fa-pulse"></i> Carregando...
        </div>
        <div class="card-body text-left" v-if="!$route.params.id || ($route.params.id && this.address)">
          <div class="row">
            <div class="form-group col-md-4">
              <label for="">Identificação do endereço<span class="text-danger">*</span></label>
              <input type="text" v-model="form.name" class="form-control" required />
            </div>
            <div class="form-group col-md-4">
              <label for="">CEP<span class="text-danger">*</span></label>
              <input type="text" v-model="form.postal_code" class="form-control" @blur="buscaCep" v-mask="'#####-###'" maxlength="9" required />
            </div>
            <div class="w-100"></div>
            <div class="form-group col-md-5">
              <label for="">Rua<span class="text-danger">*</span></label>
              <input type="text" :disabled="loading" v-model="form.street" class="form-control" required />
            </div>
            <div class="form-group col-md-3">
              <label for="">Número</label>
              <input type="text" v-model="form.number" class="form-control" />
            </div>
            <div class="form-group col-md-4">
              <label for="">Complemento</label>
              <input type="text" v-model="form.complement" class="form-control" />
            </div>
            <div class="form-group col-md-4">
              <label for="">Bairro<span class="text-danger">*</span></label>
              <input type="text" :disabled="loading" v-model="form.district" class="form-control" required />
            </div>
            
            <div class="form-group col-md-4">
              <label for="">Estado<span class="text-danger">*</span></label>
              <select class="form-control" :disabled="loading" v-model="form.state" required>
                <option value="">Selecione uma opção</option>
                <option
                  :value="estado"
                  v-for="(estado, index) in estados"
                  :key="index"
                >
                  {{ estado.nome }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="">Cidade<span class="text-danger">*</span></label>
              <select class="form-control" :disabled="loading" v-model="form.city" required>
                <option value="">Selecione uma opção</option>
                <option
                  :value="cidade"
                  v-for="(cidade, index) in cidades"
                  :key="index"
                >
                  {{ cidade.nome }}
                </option>
              </select>
            </div>
            
            <div class="form-group col-12">
              <label for="">Selecione a posição no mapa<span class="text-danger">*</span></label>
              <span class="ml-3 badge badge-success" v-if="form.lat && form.long"> <i class="fa fa-check"></i>Selecionado</span>

              <location-picker
                @select-location="selectLocation"
              ></location-picker>
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
import viaCep from "@/common/viaCep";
import LocationPicker from "@/components/AddressLocationPicker";

export default {
  components: {
    Page,
    LocationPicker
  },

  data() {
    return {
      form: {},
      address: null,
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

    estados() {
      const estados = Array.from(this.$store.getters["cidade/estados"]);

      if (estados) {
        return estados.sort((a, b) => a.nome > b.nome);
      }

      return [];
    },

    cidades() {
      const cidades = Array.from(
        this.$store.getters["cidade/cidades"](this.form.state ? this.form.state.id : null)
      );

      if (cidades) {
        return cidades.sort((a, b) => a.nome > b.nome);
      }

      return [];
    },

    userId () {
      return this.$root.user ? this.$root.user.id : null
    }
  },

  methods: {
    buscaCep () {
      if(this.form.postal_code.length != 9){
        return false
      }

      this.loading = true
      const scaped = this.form.postal_code.replace('-', '')
      viaCep.get(`${scaped}/json`)
        .then(response => {
          this.form.street = response.data.logradouro
          this.form.district = response.data.bairro
          this.form.state = this.estados.find(item => item.sigla == response.data.uf)
          this.form.city = this.cidades.find(item => item.nome == response.data.localidade)
          console.log(response)
        })
        .finally(() => {
          this.loading = false
        })
    },
    resetForm() {
      this.form = {
        user_id: this.userId,
        id: this.$route.params.id ? this.$route.params.id : null,
        street: null,
        postal_code: null,
        district: null,
        state: '',
        city: '',
        lat: null,
        long: null,
      }
    },

    getItemData(){
      this.$store.dispatch('address/getById', { id:this.form.id, params: { with_tags: true } })
      .then((response) => {
        this.address = response.data
        this.form = {
          ...this.form,
          street: this.address.street,
          number: this.address.number,
          complement: this.address.complement,
          postal_code: this.address.postal_code,
          district: this.address.district,
          state: this.estados.find(item => item.nome == this.address.state),
          lat: this.address.lat,
          long: this.address.long,
          name: this.address.name
        }

        this.form.city = this.cidades.find(item => item.nome == this.address.city)
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
      if(!(this.form.lat && this.form.long)){
        this.$swal.fire({
          title: "Oops!",
          text: 'Selecione sua posição no mapa!',
          icon: "error",
        })

        return false
      }

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

      data.user_id = this.$root.user.id
      data.state = this.form.state.nome
      data.city = this.form.city.nome
      data.country = 'Brasil'

      return data
    },

    create () {
      const data = this.getData()

      this.$store.dispatch('address/create', { data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Item cadastrado com sucesso!",
          icon: "success",
        })

        this.$router.push('/enderecos')
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

      this.$store.dispatch('address/update', { id: this.form.id, data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Item atualizado com sucesso!",
          icon: "success",
        })

        this.$router.push('/enderecos')
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