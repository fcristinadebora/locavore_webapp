<template>
  <page>
    <span slot="content">
      <h1 class="h4 w-100 text-center my-3">Resultados da busca</h1>

      <b-card no-body>
        <b-tabs pills card fill active-nav-item-class="bg-gradient">
          <b-tab title="Produtos" @click="activeTab = 'products'" active>
            <div class="row">
              <div class="col-12">
                <router-link to="/mapa/produtos" class="btn bg-gradient btn-block">
                  <i class="fa fa-location-arrow"></i> Ver no mapa
                </router-link>
              </div>
              <div class="col-12">
                <div class="w-100 text-center py-3" v-if="products == null">
                  <i class="fa fa-pulse fa-spinner"></i> Carregando
                </div>
                <div class="w-100 text-center py-3" v-if="products && !products.data.length">
                  Nenhum item localizado
                </div>
                <div class="row" v-if="products && products.data">
                  <div
                    class="col-12 col-lg-12 col-xl-6 py-3"
                    v-for="(product, index) in products.data"
                    :key="index"
                  >
                    <div class="card result-item">
                      <div class="card-body">
                        <div class="col-12">
                          <div class="row d-flex flex-row">
                            <div
                              class="item-image d-flex align-items-center rounded justify-content-center"
                              :style="
                                product.images.length
                                  ? 'background: url(' +
                                    apiUrl +
                                    product.images[0].image.file_path +
                                    product.images[0].image.file_name +
                                    ')'
                                  : null
                              "
                            >
                              <i
                                class="fa fa-image"
                                v-if="!product.images.length"
                              ></i>
                            </div>
                            <div
                              class="item-text ml-sm-3 d-flex flex-column justify-content-between"
                            >
                              <div
                                class="w-100 d-block d-sm-flex mt-3 my-sm-0 justify-content-between"
                              >
                                <div
                                  class="font-weight-bold text-center text-sm-left"
                                >
                                  <span
                                    class="badge bg-gradient mb-1 w-100 w-sm-auto"
                                    >{{
                                      product.product_category.description
                                    }}</span
                                  >
                                  {{ product.name }}
                                </div>
                                <div
                                  class="text-color2 text-center w-100 w-sm-auto"
                                >
                                  {{ product.price | toReais }}
                                </div>
                              </div>
                              <div
                                class="w-100 my-1 my-md-0 text-center text-sm-left text-muted"
                              >
                                {{ product.grower.name }}
                              </div>
                              <div
                                class="w-100 d-block d-sm-flex justify-content-between align-items-end"
                              >
                                <div
                                  class="mr-3 text-sm w-100 w-sm-auto text-center text-sm-left"
                                >
                                  <i class="fa fa-map-signs"></i>
                                  {{ product.street }}, {{ product.district }},
                                  {{ product.city }}
                                </div>
                                <div
                                  class="item-distance text-center text-sm-right mt-3 mt-sm-0 w-100 w-sm-auto"
                                >
                                  <i
                                    class="fa fa-map-marker-alt text-primary"
                                  ></i>
                                  {{
                                    (product.distance ? product.distance : "-")
                                      | toKm
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row pt-3">
                            <div class="w-100 text-center text-sm-left">
                              <span
                                class="badge mr-2 bg-color2"
                                v-for="{ tag, index } in product.tags"
                                :key="index"
                                >#{{ tag.description }}</span
                              >
                            </div>
                          </div>
                          <div class="row">
                            <div class="w-100 pt-2">
                              <router-link :to="`produto/${product.id}`" class="btn btn-block border-info text-center">Ver detalhes</router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-100">
                  <b-pagination v-model="currentProductsPage" :per-page="15" @change="changeProductsPage" align="center" pills :total-rows="totalProducts"></b-pagination>
                </div>
              </div>

            </div>
          </b-tab>
          <b-tab title="Produtores" @click="getGrowers()">
            <div class="row">
              <div class="col-12">
                <router-link to="/mapa/produtores" class="btn bg-gradient btn-block">
                  <i class="fa fa-location-arrow"></i> Ver no mapa
                </router-link>
              </div>

              <div class="col-12">
                <div class="w-100 text-center py-3" v-if="products == null">
                  <i class="fa fa-pulse fa-spinner"></i> Carregando
                </div>
                <div class="w-100 text-center py-3" v-if="products && !products.data.length">
                  Nenhum item localizado
                </div>
                <div class="row" v-if="growers && growers.data">
                  <div
                    class="col-12 col-lg-12 col-xl-6 py-3"
                    v-for="(grower, index) in growers.data"
                    :key="index"
                  >
                    <grower-card :grower="grower"></grower-card>
                  </div>
                </div>
                <div class="w-100">
                  <b-pagination v-model="currentGrowersPage" :per-page="15" @change="changeGrowersPage" align="center" pills :total-rows="totalGrowers"></b-pagination>
                </div>
              </div>
              
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page"
import GrowerCard from "@/components/GrowerCard"
import { getApiUrl } from "@/common/api"
import { EventBus } from '@/common/eventBus.js'

export default {
  data() {
    return {
      currentProductsPage: 1,
      totalProducts: 0,
      currentGrowersPage: 1,
      totalGrowers: 0,
      activeTab: "products",
      apiUrl: getApiUrl(),
    };
  },

  components: {
    Page,
    GrowerCard
  },

  computed: {
    products() {
      const items = this.$store.getters["product/items"];

      return items;
    },

    growers() {
      const items = {...this.$store.getters["grower/items"]};

      if(items && items.data){
        items.data = items.data.map(grower => {
          return {
            ...grower,
            addresses: [
              {
                street: grower.street,
                district: grower.district,
                city: grower.city,
                distance: grower.distance
              }
            ]
          }
        })
      }

      return items;
    },
  },

  mounted() {
    EventBus.$on('search', () => this.doSearch());
    this.doSearch()
  },

  methods: {
    doSearch() {
      if(this.activeTab == 'products'){
        this.getProducts()
      }

      if(this.activeTab == 'growers'){
        this.getGrowers()
      }
    },

    changeGrowersPage (newPage) {
      this.currentGrowersPage = newPage
      this.getGrowers()
    },

    getGrowers() {
      this.activeTab = "growers";
      var params = {};

      if (this.$root.searchForm.localType == "coord") {
        params = {
          lat: this.$root.searchForm.local.lat,
          long: this.$root.searchForm.local.long,
        };
      } else if (this.$root.searchForm.localType == "city") {
        params = {
          city: this.$root.searchForm.local.city,
          state: this.$root.searchForm.local.state,
        };
      }

      params = {
        ...params,
        search_string: this.$root.searchForm.search,
        page: this.currentGrowersPage,
        order_by: "distance",
      };

      this.$store
        .dispatch("grower/get", {
          params: params,
        })
        .then(response => {
          if(response.data){
            this.totalGrowers = response.data.total
          }
        })
        .finally(() => {
          if (this.$route.name != "SearchResult") {
            this.$router.push("/busca");
          }
        })
    },

    changeProductsPage (newPage) {
      this.currentProductsPage = newPage
      this.getProducts()
    },

    getProducts() {
      this.activeTab = "products";
      var params = {};

      if (this.$root.searchForm.localType == "coord") {
        params = {
          lat: this.$root.searchForm.local.lat,
          long: this.$root.searchForm.local.long,
        };
      } else if (this.$root.searchForm.localType == "city") {
        params = {
          city: this.$root.searchForm.local.city,
          state: this.$root.searchForm.local.state,
        };
      }

      params = {
        ...params,
        search_string: this.$root.searchForm.search,
        page: this.currentProductsPage,
        order_by: "distance",
      }

      this.$store
        .dispatch("product/get", {
          params: params,
        })
        .then(response => {
          if(response.data){
            this.totalProducts = response.data.total
          }
        })
        .finally(() => {
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.item-text {
  flex: 1;
}

.item-image {
  background-color: #ccc;
  display: block;
  height: 200px;
  width: 100%;
  background-size: cover !important;
  background-color: #ccc !important;
  background-position: center !important;

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) {
    height: 90px;
    width: 90px;
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) {
    height: 75px;
    width: 75px;
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) {
    height: 100px;
    width: 100px;
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
    height: 100px;
    width: 100px;
  }
}

.result-item {
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
}

.item-distance {
  min-width: 130px;
}
</style>