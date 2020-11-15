<template>
  <page>
    <span slot="content">
      <div class="w-100">
        <h1 class="h4 w-100 text-left my-3">
          Detalhes do produto
          <a @click="$router.go(-1)" class="btn btn-info btn-sm mr-2 float-right">
            <i class="fa fa-arrow-circle-left"></i> Voltar
          </a>
          <hr>
        </h1>

        <div class="card" v-if="!product">
          <div class="card-body text-center">
            <i class="fa fa-pulse fa-spinner"></i> Carregando detalhes do produto...
          </div>
        </div>

        <div class="card" v-if="product">
          <div class="card-header">
            <h1 class="h5 w-100 text-left">
              {{ product.name }}

              <span class="badge bg-gradient float-right">{{ product.product_category.description }}</span>
            </h1>
          </div>
          <div class="card-body">
            <p class="w-100 card-text">
              <span class="text-color2" v-if="product.price">{{ product.price | toReais }}</span>
              <span class="text-color2" v-if="!product.price">Valor não informado</span>
            </p>
            <hr>
            <p class="w-100 pt-3">
              <strong>Produtor</strong><br>
              <span>
                {{ product.grower.name }} | <router-link :to="`/produtor/${product.grower.id}`">Ver detalhes</router-link>
              </span>
            </p>
            <p class="w-100 card-text">
              <strong>Detalhes:</strong><br>
              <span v-html="product.description"></span>
            </p>
            <gallery class="w-100" :images="images"></gallery>
            <p class="w-100 card-text pt-3">
              <strong>Tags</strong><br>
              <span v-if="!product.tags.length">
                Nenhuma tag relacionada
              </span>
              <span class="badge bg-color2 mr-2" v-for="(tag, index) in product.tags" :key="index">
                #{{ tag.tag.description }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <rating type="Produto" :card="true" :relation-key="{product_id: productId}"></rating>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page"
import Gallery from "@/components/Gallery"
import Rating from "@/components/Rating"
import { getApiUrl } from "@/common/api"

export default {
  components: { Page, Gallery, Rating },

  data () {
    return {
      product: null,
      images: [],
      productId: this.$route.params.id
    }
  }, 

  mounted () {
    this.getProductData()
  },

  methods: {
    getProductData(){
      this.$store.dispatch('product/getById', { id:this.productId, params: { with_tags: true, with_category: true, with_images: true, with_grower: true } })
      .then((response) => {
        this.product = response.data.product

        this.images = this.product.images.map(img => {
          const image = img.image
          const imgSrc = getApiUrl() + image.file_path + image.file_name

          return {
            src: imgSrc,
            thumbnail: imgSrc,
            caption: image.title,
            id: image.id
          }
        })
      })
      .catch(error => {
        var message = 'Falha ao carregar dados do produto!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },
  }
}
</script>
