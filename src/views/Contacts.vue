<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Meus endereços - Contatos</h1>

        <router-link
          :to="`/enderecos/${$route.addressId}/contatos/cadastro`"
          class="btn bg-gradient btn-sm text-white"
        >
          <i class="fa fa-plus"></i> Novo
        </router-link>
      </div>

      <div
        class="card mb-3"
        v-if="!(items && items.data && items.data.length > 0)"
      >
        <div class="card-body text-center">
          <span v-if="!items"
            ><i class="fa fa-pulse fa-spinner"></i> Carregando...</span
          >
          <span v-if="items && !(items.data && items.data.length > 0)"
            >Nenhum item cadastrado</span
          >
        </div>
      </div>

      <div
        class="w-100"
        v-if="user && items && items.data && items.data.length > 0"
      >
        <div class="card mb-3" v-for="(addr, index) in items.data" :key="index">
          <div class="card-body d-flex justify-content-between">
            <div>
              <b>{{ addr.name }}</b
              ><br />
              {{ addr.street }}, {{ addr.number ? addr.number : "Sem número" }},
              {{ addr.complement ? `${addr.complement}, ` : null }}{{ addr.district}}<br>
              {{ addr.city }}, {{ addr.state }}, {{ addr.postal_code }}.
            </div>
            <div class="card-buttons">
              <button class="btn btn-danger text-extra-sm card-buttons my-1" type="button" @click="deleteItem(addr.id)">
                <i class="fa fa-trash"></i>
              </button>
              <router-link class="btn btn-warning text-extra-sm card-buttons my-1" :to="`/enderecos/${$route.addressId}/contatos/editar/${addr.id}`">
                <i class="fa fa-edit"></i>
              </router-link>
              <router-link class="btn btn-info text-extra-sm card-buttons my-1" :to="`/enderecos/${$route.addressId}/contatos`">
                <i class="far fa-contact-card"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
export default {
  components: {
    Page,
  },

  data() {
    return {
      currentPage: 1,
      address: null,
      items: null,
    };
  },

  mounted() {
    this.getItems();
  },

  computed: {
    user(){
      if(this.$root.user){
        this.getItems()
      }

      return this.$root.user
    }
  },

  methods: {
    getAddress(){
      this.$store.dispatch('address/getById', { id:this.$route.addressId })
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

    getItems() {
      this.$store
        .dispatch("address/get", {
          params: {
            page: this.currentPage,
            user_id: this.$root.user ? this.$root.user.id : null
          }
        })
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          this.items = [];
          console.error("Falha ao obter items", error);
        })
    },

    deleteItem (id) {
      this.$swal.fire({
        title: 'Deseja excluir o item?',
        text: "Não será possível desfazer essa ação",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Excluir'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('address/delete', {id: id})
          .then(() => {
            this.$swal.fire({
              title: "Ok!",
              text: "Item excluído!",
              icon: "success",
            })
            this.items = null
            this.currentPage = 1
            this.getItems()
          })
          .catch((error) => {
            this.$swal.fire({
              title: "Oops!",
              text: "Falha ao excluir item",
              icon: "error",
            })

            console.error('falha ao excluir item', error)
          })
        }
      })
      
    }
  },
};
</script>