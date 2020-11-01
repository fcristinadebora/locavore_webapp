<template>
  <page>
    <span slot="content">
      <h1 class="h4 w-100 text-center my-3">Resultados da busca</h1>
      
      <div class="card" v-if="!products">
        <div class="card-body text-center">
          <span v-if="products == null">
            <i class="fa fa-pulse fa-spinner"></i> Carregando
          </span>
          <span v-if="products == false">
            Nenhum item localizado
          </span>
        </div>
      </div>

      <b-card no-body v-if="products && products.data">
        <b-tabs pills card fill active-nav-item-class="bg-gradient">
          <b-tab title="Produtos" active>
            <div class="row">
              <div class="col-12">
                <button class="btn bg-gradient btn-block">
                  <i class="fa fa-location-arrow"></i> Ver no mapa
                </button>
              </div>

              <div class="col-12 col-lg-12 col-xl-6 py-3" v-for="(product, index) in products.data" :key="index">
                <div class="card result-item">
                  <div class="card-body">
                    <div class="col-12">
                      <div class="row d-flex flex-row">
                        <div class="item-image d-flex align-items-center rounded"
                          :style="product.images.length ? 'background: url(' + apiUrl + product.images[0].image.file_path + product.images[0].image.file_name + ')' : null">
                          <i class="fa fa-image" v-if="!product.images.length"></i>
                        </div>
                        <div class="item-text ml-sm-3 d-flex flex-column justify-content-between">
                          <div class="w-100 d-block d-sm-flex mt-3 my-sm-0 justify-content-between">
                              <div class="font-weight-bold text-center text-sm-left">
                              <span class="badge bg-gradient mb-1 w-100 w-sm-auto">{{ product.product_category.description }}</span> {{ product.name }}</div>
                              <div class="text-color2 text-center w-100 w-sm-auto">{{ product.price | toReais }}</div>
                          </div>
                          <div class="w-100 my-1 my-md-0 text-center text-sm-left text-muted">{{ product.grower.name }}</div>
                          <div class="w-100 d-block d-sm-flex justify-content-between align-items-end">
                            <div class="mr-3 text-sm w-100 w-sm-auto text-center text-sm-left"><i class="fa fa-map-signs"></i> {{ product.street }}, {{ product.district }}, {{ product.city }}</div>
                            <div class="item-distance text-center text-sm-right mt-3 mt-sm-0 w-100 w-sm-auto"><i class="fa fa-map-marker-alt text-primary"></i> {{ (product.distance ? product.distance : '-') | toKm }} </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Produtores">
            <b-card-text
              >Você ainda não informou nenhum interesse.
              <a href="">Clique aqui</a> para gerenciar seus interesses e ver
              resultados compatíveis em sua tela inicial</b-card-text
            >
          </b-tab>
        </b-tabs>
      </b-card>

      
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
import { getApiUrl } from "@/common/api";

export default {
  data() {
    return {
      currentPage: 1,
      apiUrl: getApiUrl()
    }
  },

  components: {
    Page,
  },

  computed: {
    products() {
      const items = this.$store.getters["product/items"]

      console.log(items)

      return items;
    },
  },
};
</script>item-distance

<style lang="scss" scoped>
.item-text{
  flex: 1;
}

.item-image{
  background-color: #ccc;
  display: block;
  height: 200px; width: 100%;
  background-size: cover !important;
  background-color: #ccc !important;
  background-position: center !important;

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) { height: 90px; width: 90px; }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) { height: 75px; width: 75px; }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) { height: 100px; width: 100px; }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) { height: 100px; width: 100px; }
}

.result-item{
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
}

.item-distance{
  min-width: 130px;
}
</style>