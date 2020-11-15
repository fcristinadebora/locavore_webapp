<template>
  <div class="w-100">
    <strong class="mr-3">Avaliação média:</strong>
    <div class="w-100 text-left" v-if="!items || !(items && items.data && items.data.length)">Nenhuma avaliação recebida</div>

    <span v-if="items && items.data && items.data.length" class="text-sm">
      <big>
        <i class="mr-1 text-warning" v-for="(star, index) in getStars(avgRating)" :key="index" :class="star"></i>
      </big>
      <span class="ml-2">{{ parseFloat(avgRating).toFixed(1).replace('.', ',') }}</span>
    </span>
    <hr>
    <strong>Avaliações</strong>
    <div class="row">
      <div class="col-12 text-left" v-if="!items || !(items && items.data && items.data.length)">Nenhuma avaliação recebida</div>
      <div class="col-12 d-flex mt-3 mb-4" v-for="(rating, index) in items.data" :key="index">
        <div class="profile-image mr-4">
          <div class="profile-image--image rounded rounded-circle d-flex justify-content-center align-items-center"
            :style="rating.rating.rater.profile_file_path ? `background-image: url(${apiUrl
              + rating.rating.rater.profile_file_path
              + rating.rating.rater.profile_file_name});` : null ">
            <i
              class="fa fa-image"
              v-if="!rating.rating.rater.profile_file_path"
              ></i>
          </div>
        </div>
        <div>
          <div class="w-100">
            <strong>{{ rating.rating.rater.name }}</strong>
          </div>
          <div class="w-100 pt-2">
            <span>
              <i class="mr-1 text-warning" v-for="(star, index) in getStars(rating.rating.rating)" :key="index" :class="star"></i>
            </span>
            <span class="ml-2 text-sm">
              {{ rating.rating.created_at | formatDate('D/M/Y') }}
            </span>
          </div>
          <div class="w-100 pt-2">
            {{ rating.rating.description }}
          </div>
        </div>
      </div>

      <div class="col-12">
        <b-pagination v-model="currentPage" :per-page="perPage" @change="changePage" align="center" pills :total-rows="total"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiUrl } from "@/common/api";

export default {
  props: {
    relationKey: {
      type: Object
    }
  },

  data () {
    return {
      apiUrl: getApiUrl(),
      currentPage: 1,
      perPage: 4,
      total: 0,
      avgRating: null,
      items: []
    }
  },

  mounted () {
    this.getRating()
    this.getAvg()
  },

  methods: {
    getStars(rating){
      rating = Math.floor(rating)
      const maxStars = 5

      var starsArray = []
      for(var i = 0; i < rating; i++){
        starsArray.push('fa fa-star')
      }
      
      for(i = 0; i < maxStars - rating; i++){
        starsArray.push('far fa-star')
      }

      return starsArray
    },

    getRating () {
      const params = {
        ...this.relationKey,
        per_page: this.perPage,
        page: this.currentPage
      }

      this.$store
        .dispatch("rating/get", {
          params: params
        })
        .then((response) => {
          this.items = response.data
          this.total = response.data.total
        })
        .catch((error) => {
          this.items = false;
          console.error("Falha ao obter avaliação", error);
        }) 
    },

    getAvg () {
      const params = {
        ...this.relationKey
      }

      this.$store
        .dispatch("rating/getAvg", {
          params: params
        })
        .then((response) => {
          this.avgRating = response.data.avg
        })
        .catch((error) => {
          this.avgRating = null;
          console.error("Falha ao obter avaliação", error);
        }) 
    },

    changePage(newPage){
      this.currentPage = newPage

      this.getRating()
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-image--image{
  background-color: #ccc;
  display: block;
  height: 200px;
  width: 100%;
  background-size: cover !important;
  background-color: #ccc !important;
  background-position: center !important;
  height: 45px;
  width: 45px;

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) {
    height: 75px;
    width: 75px;
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
}
</style>