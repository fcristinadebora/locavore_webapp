<template>
  <page>
    <span slot="content">
      <div class="w-100">
        <h1 class="h4 w-100 text-left my-3">
          Detalhes do produtor
          <a @click="$router.go(-1)" class="btn btn-info btn-sm mr-2 float-right">
            <i class="fa fa-arrow-circle-left"></i> Voltar
          </a>
          <hr />
        </h1>

        <div class="card" v-if="!grower">
          <div class="card-body text-center">
            <i class="fa fa-pulse fa-spinner"></i> Carregando detalhes do
            produtor...
          </div>
        </div>

        <div class="card" v-if="grower">
          <div class="card-body">
            <div class="w-100 card-text py-3">
              <div
                class="item-image mr-0 mr-sm-3 mb-3 d-flex align-items-center rounded float-left"
                :style="
                  grower.profile_file_path.length
                    ? 'background: url(' +
                      apiUrl +
                      grower.profile_file_path +
                      grower.profile_file_name +
                      ')'
                    : null
                "
              >
                <i
                  class="fa fa-image"
                  v-if="!grower.profile_file_path.length"
                ></i>
              </div>
              <div>
                <h2 class="h5 w-100 text-left">
                  {{ grower.name }}
                </h2>
                <strong>Categorias de produtos</strong><br />
                <span v-if="!grower.product_categories.length">
                  Nenhuma tag relacionada
                </span>
                <span
                  class="badge bg-color2 mr-2 font-weight-normal"
                  v-for="(category, index) in grower.product_categories"
                  :key="index"
                >
                  {{ category.product_category.description }}
                </span>
                <div class="w-100 my-3"></div>
                <strong>Detalhes:</strong><br />
                <span v-html="grower.description"></span>
              </div>
            </div>
            <hr>
            <strong>Galeria de imagens</strong><br />
            <gallery class="w-100" :images="images"></gallery>
            <p class="w-100 card-text pt-3">
              <strong>Tags</strong><br />
              <span v-if="!grower.identification_tags.length">
                Nenhuma tag relacionada
              </span>
              <span
                class="badge bg-color2 mr-2"
                v-for="(tag, index) in grower.identification_tags"
                :key="index"
              >
                #{{ tag.tag.description }}
              </span>
            </p>

            <div class="w-100">
            <hr>
            <strong>Endereço(s)</strong><br /><br />
            <div class="w-100 mb-3" v-for="(addr, index) in grower.addresses" :key="index">
              <i class="fa fa-map-marker-alt text-info"></i> <strong>{{ addr.name }}</strong><br>
              <span>
              {{ addr.street }}, {{ addr.number ? addr.number : 'Sem número' }}, {{ addr.complement ? `${addr.complement}, ` : null }} {{ addr.district }}, 
              {{ addr.city }}, {{ addr.state }}, {{ addr.postal_code }}.
              </span>

              <div class="w-100 mt-2 mb-4">
                <div class="d-block d-sm-inline w-100 w-sm-auto mr-4" v-for="(contact, index) in addr.contacts" :key="index">
                  <a v-if="contact.type == 'whatsapp'" target="_blank" :href="`https://api.whatsapp.com/send?phone=${contact.value}`">
                    <i class="fab fa-whatsapp text-success"></i>&nbsp;{{ contact.value }}
                  </a>
                  <a v-if="contact.type == 'phone'" target="_blank" :href="`tel:${contact.value}`">
                    <i class="fa fa-phone-alt text-secondary"></i>&nbsp;{{ contact.value }}
                  </a>
                  <a v-if="contact.type == 'email'" target="_blank" :href="`mailto:${contact.value}`">
                    <i class="far fa-envelope text-primary"></i>&nbsp;{{ contact.value }}
                  </a>
                  <a v-if="contact.type == 'others'">
                    <i class="far fa-address-book text-secondary"></i>&nbsp;{{ contact.value }}
                  </a>                  
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
import Gallery from "@/components/Gallery";
import { getApiUrl } from "@/common/api";

export default {
  components: { Page, Gallery },

  data() {
    return {
      grower: null,
      images: [],
      apiUrl: getApiUrl(),
    };
  },

  mounted() {
    this.getGrowerData();
  },

  methods: {
    getGrowerData() {
      this.$store
        .dispatch("grower/getById", {
          id: this.$route.params.id,
          params: {
            with_tags: true,
            with_categories: true,
            with_images: true,
            with_grower: true,
            with_address:true
          },
        })
        .then((response) => {
          this.grower = response.data.grower;

          this.images = this.grower.images.map((img) => {
            const image = img.image;
            const imgSrc = getApiUrl() + image.file_path + image.file_name;

            return {
              src: imgSrc,
              thumbnail: imgSrc,
              caption: image.title,
              id: image.id,
            };
          });
        })
        .catch((error) => {
          var message = "Falha ao carregar dados do produtor!";

          this.$swal.fire({
            title: "Oops!",
            text: message,
            icon: "error",
          });

          console.error(message, error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    height: 150px;
    width: 150px;
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