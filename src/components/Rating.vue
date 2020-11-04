<template>
  <div class="card mt-3">
    <div class="card-header font-weight-bold">Avaliação</div>
    <div class="card-body">
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
    }
  }
}
</script>