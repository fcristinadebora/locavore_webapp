<template>
  <div class="mt-3" :class="card ? 'card' : 'w-100'">
    <div v-if="!card" class="font-weight-bold mb-3">
      <hr>
      <big>Avaliação</big>
    </div>
    <div v-if="card" class="card-header font-weight-bold">Avaliação</div>
    <div :class="card ? 'card-body' : null">
      <rating-form :type="type" :relation-key="relationKey" @created="reloadItems"></rating-form>
      <rating-items :relation-key="relationKey" :key="ratingItemsKey"></rating-items>
    </div>
  </div>
</template>

<script>
import RatingForm from './rating/Form'
import RatingItems from './rating/Items'

export default {
  components: {
    RatingForm,
    RatingItems
  },

  props: {
    type: {
      type: String
    },
    card: {
      type: Boolean
    },
    relationKey: {
      type: Object
    }
  },

  data () {
    return {
      ratingItemsKey: Math.random()
    }
  },

  methods: {
    getRating () {
      const params = {
        ...this.relationKey,
        per_page: 5
      }

      this.$store
        .dispatch("rating/get", {
          params: params
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

    reloadItems () {
      this.ratingItemsKey = Math.random()
    }
  }
}
</script>