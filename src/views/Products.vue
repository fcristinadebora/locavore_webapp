<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Meus produtos</h1>

        <router-link
          to="/produtos/cadastro"
          class="btn bg-gradient btn-sm text-white"
        >
          <i class="fa fa-plus"></i> Novo
        </router-link>
      </div>

      <div class="card" v-if="!products">
        <div class="card-body text-center">
          <i class="fa fa-spinner fa-pulse"></i> Carregando
        </div>
      </div>

      <div class="card" v-if="products && products.length == 0">
        <div
          class="card-body text-center"
          
        >
          Nenhum produto encontrado
        </div>
      </div>

      <span v-if="products && products.data">
        <div
          class="card mb-3"
          v-for="(product, index) in products.data"
          :key="index"
        >
          <div class="card-body d-flex justify-content-between">
            <div>
              #{{ product.id }} - <strong class="mb-2">{{ product.name }}</strong><br>
              <span class="mb-2"><strong>Valor:</strong> {{ product.price | toReais }}</span>
              <div class="mb-2 w-100"><strong>Descricao:</strong> 
                <p class="overflow-hidden" style="height:50px" v-html="product.description ? product.description : 'Não informado'"></p></div>
            </div>
            <div class="card-buttons">
              <button class="btn btn-danger text-extra-sm card-buttons my-1" type="submit" @click="deleteProduct(product.id)">
                <i class="fa fa-trash"></i>
              </button>
              <router-link class="btn btn-warning text-extra-sm card-buttons my-2" :to="`/produtos/editar/${product.id}`" >
                <i class="fa fa-edit"></i>
              </router-link>
              <router-link class="btn btn-info text-extra-sm card-buttons my-1" :to="`/produtos/imagens/${product.id}`" >
                <i class="fa fa-images"></i>
              </router-link>
            </div>
          </div>
        </div>
      </span>
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
      products: null,
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      this.$store
        .dispatch("product/get", {
          params: {
            page: this.currentPage,
            user_id: this.$root.user ? this.$root.user.id : null,
            unique: true
          }
        })
        .then((response) => {
            if(response.data.data.length == 0){
                this.products = []
            }else{
                this.products = response.data
            }
        })
        .catch((error) => {
          this.products = [];
          console.error("Falha ao obter produtos", error);
        })
    },

    deleteProduct (id) {
      this.$swal.fire({
        title: 'Deseja excluir o produto?',
        text: "Não será possível desfazer essa ação",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Excluir'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('product/delete', {id: id})
          .then(() => {
            this.$swal.fire({
              title: "Ok!",
              text: "Produto excluído!",
              icon: "success",
            })
            this.products = null
            this.currentPage = 1
            this.getProducts()
          })
          .catch((error) => {
            this.$swal.fire({
              title: "Oops!",
              text: "Falha ao excluir produto",
              icon: "error",
            })

            console.error('falha ao excluir produto', error)
          })
        }
      })
      
    }
  },
};
</script>