<template>
  <form @submit.prevent="save">
    <strong>Avaliar {{ type }}</strong>
    <div class="form-group mt-3">
      <label for="" class="mr-3">Avaliação:</label>
      <big class="text-warning">
        <i @mouseover="setTempRating(i)"
          @mouseout="unsetTempRating()"
          @click="setRating(i)"
          class="fa-star cursor-pointer"
          v-for="i in 5"
          :key="i"
          :class="tempRating >= i ? 'fa' : 'far'"
          ></i>
      </big>
    </div>
    <div class="form-group">
      <label for="">Descreva sua avaliação</label>
      <textarea rows="3" class="form-control" v-model="form.description"></textarea>
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
    },
    relationKey: {
      type: Object
    }
  },

  data () {
    return {
      i: 0,
      tempRating: 0,
      form: {}
    }
  },

  methods: {
    resetForm () {
      this.tempRating = 0
      
      this.form = {
        rating: 0,
        description: ''
      }
    },

    setTempRating(rating) {
      this.tempRating = rating
    },

    unsetTempRating(){
      if(this.form.rating){
        this.tempRating = this.form.rating
        return 
      }

      this.tempRating = 0
    },

    setRating(rating){
      this.form.rating = rating
      this.tempRating = this.form.rating
    },

    save () {
      const data = {
        rated_by: this.$root.user.id,
        ...this.relationKey,
        ...this.form
      }

      if(!data.rating){
        this.$swal.fire({
          title: "Oops!",
          text: 'Informe o valor da avaliação',
          icon: "error",
        })
        return false
      }

      this.$store.dispatch('rating/create', { data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Avaliação cadastrada com sucesso!",
          icon: "success",
        })

        this.$emit('created')
        this.resetForm()
      })
      .catch(error => {
        var message = 'Falha ao gravar avaliação!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    }
  }
}
</script>