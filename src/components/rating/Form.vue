<template>
  <form action="">
    <strong>Avaliar {{ type }}</strong>
    <div class="form-group mt-3">
      <label for="" class="mr-3">Avaliação:</label>
      <big class="text-warning">
        <i class="far fa-star mr-1"></i>
        <i class="far fa-star mr-1"></i>
        <i class="far fa-star mr-1"></i>
        <i class="far fa-star mr-1"></i>
        <i class="far fa-star mr-1"></i>
      </big>
    </div>
    <div class="form-group">
      <label for="">Descreva sua avaliação</label>
      <textarea rows="3" class="form-control"></textarea>
    </div>
    <div class="form-group text-right">
      <button class="btn btn-success">
        <i class="fa fa-check"></i> Avaliar
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
  }
}
</script>