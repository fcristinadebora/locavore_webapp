<template>
  <div class="card result-item">
    <div class="card-body">
      <div class="col-12">
        <div class="row d-flex flex-row">
          <div
            class="item-image d-flex align-items-center rounded rounded justify-content-center"
            :style="
              grower.profile_file_path
                ? 'background: url(' +
                  apiUrl +
                  grower.profile_file_path +
                  grower.profile_file_name +
                  ')'
                : null
            "
          >
            <i class="fa fa-image" v-if="!grower.profile_file_path"></i>
          </div>
          <div
            class="item-text ml-sm-3 d-flex flex-column justify-content-between"
          >
            <div
              class="w-100 d-block d-sm-flex mt-3 my-sm-0 justify-content-between"
            >
              <div class="font-weight-bold text-center text-sm-left w-100">
                {{ grower.name }}
                <span class="float-right text-danger">
                  <i
                    class="fas fa-heart cursor-pointer"
                    v-if="isFavorite(grower.id)"
                    @click="removeFavorite(grower.id)"
                  ></i>
                  <i
                    class="far fa-heart cursor-pointer"
                    v-if="!isFavorite(grower.id)"
                    @click="addFavorite(grower.id)"
                  ></i>
                </span>
              </div>
            </div>
            <div
              class="font-weight-bold text-center text-sm-left"
              v-if="grower.product_categories.length > 0"
            >
              <span
                class="badge bg-gradient mb-1 w-100 w-sm-auto mr-2"
                v-for="(category, index) in grower.product_categories"
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
                {{ grower.addresses[0].street }}, {{ grower.addresses[0].district }},
                {{ grower.addresses[0].city }}
              </div>
              <div
                class="item-distance text-center text-sm-right mt-3 mt-sm-0 w-100 w-sm-auto"
              >
                <i class="fa fa-map-marker-alt text-primary"></i>
                {{ (grower.addresses[0].distance !== null ? grower.addresses[0].distance : "-") | toKm }}
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-3">
          <div class="w-100 text-center text-sm-left">
            <span
              class="badge mr-2 bg-color2"
              v-for="(tag, index) in grower.addresses[0].identification_tags"
              :key="index"
              >#{{ tag.tag.description }}</span
            >
          </div>
        </div>
        <div class="row">
          <div class="w-100 pt-2">
            <router-link
              :to="`produtor/${grower.id}`"
              class="btn btn-block border-info text-center"
              >Ver detalhes</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiUrl } from '@/common/api'

export default {
  props: {
    grower: {type: Object}
  },

  data () {
    return { 
      apiUrl: getApiUrl()
    }
  },

  computed: {
    favorites() {
      const items = this.$store.getters["favorite/items"];

      if(!items) {
        this.$store.dispatch("favorite/fetchFromApi", { params: {
          user_id: this.$root.user.id
        }})
      }

      return items;
    },
  },

  methods: {
    isFavorite(grower_id){
      if(!this.favorites){
        return false
      }

      return this.favorites.some(favorite => {
        return favorite.favorite_user_id == grower_id
      })
    },

    addFavorite (grower_id) {
      const data = {
        user_id: this.$root.user.id,
        favorite_user_id: grower_id
      }

      this.$store.dispatch('favorite/create', {data: data})
      return true
    },

    removeFavorite (grower_id) {
      const favorite = this.favorites.find(favorite => {
        return favorite.favorite_user_id == grower_id
      })

      this.$store.dispatch('favorite/delete', {id: favorite.id})
    }
  }
}
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