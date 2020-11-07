<template>
  <div class="mt-3" :class="card ? 'card' : 'w-100'">
    <div v-if="!card" class="font-weight-bold mb-3">
      <hr>
      <big>Avaliação</big>
    </div>
    <div v-if="card" class="card-header font-weight-bold">Avaliação</div>
    <div :class="card ? 'card-body' : null">
      <rating-form :type="type"></rating-form>
      <rating-items></rating-items>
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
    }
  }
}
</script>