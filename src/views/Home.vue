<template>
  <page>
    <span slot="content">
      <span class="btn btn-block bg-gradient text-white mb-3 font-weight-bold"
        >Bem-vindo(a) ao Locavore!</span
      >

      <b-card no-body v-if="user">
        <b-tabs pills card fill active-nav-item-class="bg-gradient">
          <b-tab title="Produtores Favoritos" active>
            <b-card-text v-if="!favorites || (growers && !growers.data.length)"
              >Você ainda não favoritou nenhum produtor. Busque e favorite
              produtores para vê-los em sua tela inicial</b-card-text
            >

            <div class="row" v-if="growers && growers.data">
              <div class="col-12">
                <router-link to="/mapa/favoritos" class="btn bg-gradient btn-block">
                  <i class="fa fa-location-arrow"></i> Ver no mapa
                </router-link>
              </div>

              <div
                class="col-12 col-lg-12 col-xl-6 py-3"
                v-for="(grower, index) in growers.data"
                :key="index"
              >
                <div class="card result-item">
                  <div class="card-body">
                    <div class="col-12">
                      <div class="row d-flex flex-row">
                        <div
                          class="item-image d-flex align-items-center rounded"
                          :style="
                            grower.favorite_user.profile_file_path.length
                              ? 'background: url(' +
                                apiUrl +
                                grower.favorite_user.profile_file_path +
                                grower.favorite_user.profile_file_name +
                                ')'
                              : null
                          "
                        >
                          <i
                            class="fa fa-image"
                            v-if="
                              !grower.favorite_user.profile_file_path.length
                            "
                          ></i>
                        </div>
                        <div
                          class="item-text ml-sm-3 d-flex flex-column justify-content-between"
                        >
                          <div
                            class="w-100 d-block d-sm-flex mt-3 my-sm-0 justify-content-between"
                          >
                            <div
                              class="font-weight-bold text-center text-sm-left w-100"
                            >
                              {{ grower.favorite_user.name }}
                              <span class="float-right text-danger">
                                <i
                                  class="fas fa-heart cursor-pointer"
                                  @click="
                                    removeFavorite(grower.favorite_user.id)
                                  "
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div
                            class="font-weight-bold text-center text-sm-left"
                            v-if="
                              grower.favorite_user.product_categories.length > 0
                            "
                          >
                            <span
                              class="badge bg-gradient mb-1 w-100 w-sm-auto mr-2"
                              v-for="(category, index) in grower.favorite_user
                                .product_categories"
                              :key="index"
                              >{{ category.product_category.description }}</span
                            >
                          </div>
                          <div
                            class="w-100 d-block d-sm-flex justify-content-between align-items-end"
                          >
                            <div
                              class="mr-3 text-sm w-100 w-sm-auto text-center text-sm-left"
                            >
                              <i class="fa fa-map-signs"></i>
                              {{ grower.favorite_user.addresses[0].street }},
                              {{ grower.favorite_user.addresses[0].district }},
                              {{ grower.favorite_user.addresses[0].city }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row pt-3">
                        <div class="w-100 text-center text-sm-left">
                          <span
                            class="badge mr-2 bg-color2"
                            v-for="(tag, index) in grower.favorite_user
                              .identification_tags"
                            :key="index"
                            >#{{ tag.tag.description }}</span
                          >
                        </div>
                      </div>
                      <div class="row">
                        <div class="w-100 pt-2">
                          <router-link
                            :to="`produtor/${grower.favorite_user.id}`"
                            class="btn btn-block border-info text-center"
                            >Ver detalhes</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100">
              <b-pagination
                v-model="currentGrowersPage"
                :per-page="15"
                @change="changeGrowersPage"
                align="center"
                pills
                :total-rows="totalGrowers"
              ></b-pagination>
            </div>
          </b-tab>
          <b-tab title="Interesses" @click="getInterestCompatible()">
            <b-card-text v-if="!totalInterests"
              >Você ainda não informou nenhum interesse.
              <router-link to="/interesses">Clique aqui</router-link> para
              gerenciar seus interesses e ver resultados compatíveis em sua tela
              inicial</b-card-text
            >

            <div class="col-12" v-if="totalInterests > 0">
              <div class="row">
                <div class="col-12 font-weight-bold">
                  Produtos
                </div>

                <div class="col-12" v-if="compatibleInterests.products == null">
                  <i class="fa fa-pulse fa-spinner"></i> Carregando
                </div>

                <div class="col-12" v-if="compatibleInterests.products != null && compatibleInterests.products.length  == 0">
                  Nenhum produto compatível com seus interesses foi localizado <span v-if="hasAddress">na mesma cidade do seu endereço principal.</span>
                </div>

                <div class="col-12" v-if="compatibleInterests.products != null && compatibleInterests.products.length > 0">
                  <div class="row">
                     <div
                    class="col-12 col-lg-12 col-xl-6 py-3"
                    v-for="(product, index) in compatibleInterests.products"
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
                                  {{ product.grower.addresses[0].street }}, {{ product.grower.addresses[0].district }},
                                  {{ product.grower.addresses[0].city }}
                                </div>
                                <div
                                  class="item-distance text-center text-sm-right mt-3 mt-sm-0 w-100 w-sm-auto"
                                >
                                  <i
                                    class="fa fa-map-marker-alt text-primary"
                                  ></i>
                                  {{
                                    (product.grower.addresses[0].distance !== null ? product.grower.addresses[0].distance : "-")
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
                </div>
              </div>

              <div class="row">
                <div class="col-12 font-weight-bold">
                  Produtores
                </div>

                <div class="col-12" v-if="compatibleInterests.growers == null">
                  <i class="fa fa-pulse fa-spinner"></i> Carregando
                </div>

                <div class="col-12" v-if="compatibleInterests.growers != null && compatibleInterests.growers.length  == 0">
                  Nenhum produto compatível com seus interesses foi localizado <span v-if="hasAddress">na mesma cidade do seu endereço principal.</span>
                </div>


                <div class="col-12" v-if="compatibleInterests.growers != null && compatibleInterests.growers.length > 0">
                  <div class="row">
                     <div
                    class="col-12 col-lg-12 col-xl-6 py-3"
                    v-for="(grower, index) in compatibleInterests.growers"
                    :key="index"
                  >
                    <grower-card :grower="grower"></grower-card>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>

      <b-card no-body v-if="!user">
        <b-tabs
          pills
          card
          fill
          active-nav-item-class="bg-gradient"
          class="text-center"
        >
          <b-tab title="Produtores Favoritos" active>
            <b-card-text
              >Para visualizar seus produtores favoritos em sua tela inicial<br /><br />
              <router-link class="btn bg-color1 text-white btn-sm" to="/login"
                >faça login</router-link
              >
              ou
              <router-link
                class="btn bg-color1 text-white btn-sm"
                to="/cadastro"
                >cadastre-se</router-link
              >
            </b-card-text>
          </b-tab>
          <b-tab title="Interesses">
            <b-card-text
              >Para visualizar resultados compatíveis com seus interesses
              <br /><br />
              <router-link class="btn bg-color1 text-white btn-sm" to="/login"
                >faça login</router-link
              >
              ou
              <router-link
                class="btn bg-color1 text-white btn-sm"
                to="/cadastro"
                >cadastre-se</router-link
              >
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
import { getApiUrl } from "@/common/api";
import GrowerCard from "@/components/GrowerCard";

export default {
  components: {
    Page,
    GrowerCard
  },

  data() {
    return {
      growers: null,
      currentGrowersPage: 1,
      totalGrowers: 0,
      apiUrl: getApiUrl(),
      totalInterests: 0,
      compatibleInterests: {
        products: null,
        growers: null
      }
    };
  },

  mounted() {
    
  },

  computed: {
    user() {
      const user = this.$store.getters["user/user"];

      if (user === null) {
        this.$store.dispatch("user/authenticated");
      }else{
        this.getGrowers();
        this.getInterests();
      }


      return user;
    },

    favorites() {
      const items = this.$store.getters["favorite/items"];

      if (!items && !!this.$root.user) {
        this.$store.dispatch("favorite/fetchFromApi", {
          params: {
            user_id: this.$root.user.id,
          },
        });

        this.getGrowers();
      }

      return items;
    },

    hasAddress() {
      const value = this.$store.getters["address/hasAddress"];

      return value;
    },
  },

  methods: {
    changeGrowersPage(newPage) {
      this.currentGrowersPage = newPage;
      this.getGrowers();
    },

    getGrowers() {
      if (!this.$root.user) {
        return null;
      }

      this.activeTab = "growers";

      this.$store
        .dispatch("favorite/fetchPerPage", {
          params: {
            paginated: true,
            page: this.currentGrowersPage,
            user_id: this.$root.user.id,
            with_address: true,
            with_categories: true,
          },
        })
        .then((response) => {
          if (response.data) {
            this.totalGrowers = response.data.total;
            this.growers = response.data;
          }
        });
    },

    removeFavorite(grower_id) {
      const favorite = this.favorites.find((favorite) => {
        return favorite.favorite_user_id == grower_id;
      });

      this.$store.dispatch("favorite/delete", { id: favorite.id }).then(() => {
        this.getGrowers();
      });
    },

    getInterestCompatible() {
      if (!this.$root.user) {
        return null;
      }

      this.activeTab = "interests";

      this.$store
        .dispatch("interest/getCompatible", {
          params: {
            user_id: this.$root.user.id,
          },
        })
        .then((response) => {
          this.compatibleInterests = response.data.items
        })
        .catch((error) => {
          this.compatibleInterests = {
            products: [],
            growers: []
          }
          console.error("error", error);
        });
    },

    getInterests() {
      console.log('interestssss')
      this.$store
      .dispatch("interest/get", {
        params: {
          user_id: this.$root.user.id,
        },
      })
      .then((response) => {
        console.log('interests', response)
        if (response.data) {
          this.totalInterests = response.data.total;
        }
      })
      .catch(() => {
        console.log("Falha ao obter tags");
      });
    },
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
</style>
