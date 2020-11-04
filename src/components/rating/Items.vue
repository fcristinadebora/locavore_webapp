<template>
  <div class="w-100">
    <strong class="mr-3">Avaliação média:</strong>
    <big>
      <i class="mr-1 text-warning" v-for="(star, index) in getStars(4.3)" :key="index" :class="star"></i>
    </big>
    <span class="ml-2">4.3</span>
    <hr>
    <strong>Avaliações</strong>
    <div class="row">
      <div class="col-12 d-flex mt-3 mb-4" v-for="(rating, index) in items" :key="index">
        <div class="profile-image mr-4">
          <div class="profile-image--image rounded rounded-circle d-flex justify-content-center align-items-center"
            :style="rating.profile ? `background-image: url(${rating.profile});` : null ">
            <i
              class="fa fa-image"
              v-if="!rating.profile"
              ></i>
          </div>
        </div>
        <div>
          <div class="w-100">
            <strong>{{ rating.name }}</strong>
          </div>
          <div class="w-100 pt-2">
            <span>
              <i class="mr-1 text-warning" v-for="(star, index) in getStars(rating.rating)" :key="index" :class="star"></i>
            </span>
            <span class="ml-2 text-sm">
              {{ rating.date }}
            </span>
          </div>
          <div class="w-100 pt-2">
            {{ rating.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          profile: require('@/assets/img/profile.jpg'),
          name: 'Debora Cristina',
          date: '23/10/2020',
          rating: 5,
          description: 'Muito bom! Nada a reclamar. Excelente atendimento e produtos'
        },
        {
          profile: require('@/assets/img/profile2.jpg'),
          name: 'Arthur Ipsum',
          date: '20/10/2020',
          rating: 4,
          description: 'Produtos excelentes, somente o local é de difícil acesso.'
        },
        {
          profile: null,
          name: 'Joana Lorem',
          date: '19/09/2020',
          rating: 5,
          description: 'Muito bom! Nada a reclamar. Excelente atendimento e produtos'
        },
      ]
    }
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