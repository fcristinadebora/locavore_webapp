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
            <div class="overflow-hidden">
              <strong class="mb-2">{{ product.name }}</strong><br>
              <span class="mb-2"><strong>Valor:</strong> {{ product.price ? 'R$ ' + product.price.toLocaleString() : 'Não informado' }}</span><br>
              <span class="mb-2"><strong>Descricao:</strong> {{ product.description ? product.description : 'Não informado' }}</span>
            </div>
            <div class="card-buttons">
              <button class="btn btn-danger text-extra-sm card-buttons my-1" >
                <i class="fa fa-trash"></i>
              </button>
              <a class="btn btn-danger text-extra-sm card-buttons my-1" :href="'/produtos/editar/' + product.id" >
                <i class="fa fa-trash"></i>
              </a>
              <router-link class="btn btn-warning text-extra-sm card-buttons my-1" :to="{ path: '/produtos/editar/', params: {id: product.id} }" >
                <i class="fa fa-edit"></i>
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
          },
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
        });
    },
  },
};
</script>