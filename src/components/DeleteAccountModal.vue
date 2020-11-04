<template>
  <b-modal
    id="delete-account-modal"
    class="text-center"
    title="Excluir conta"
    :hide-footer="true"
    >
    <form action="">
      <div class="alert alert-warning">
        <strong><i class="fa fa-alert-triangle"></i> Atenção!</strong> Ao excluir sua conta, todos seus dados e demais informações associadas ao seu perfil serão excluídos.
        <strong>Essa operação não poderá ser desfeita</strong>
      </div>
      <div class="form-group">
        <label for="">Para prosseguir com a operação, informe sua senha:</label>
        <input type="text" name="" id="" class="form-control">
      </div>
      <div class="form-group text-right">
        <button class="btn btn-secondary" type="button" @click="closeModal()">
          <i class="fa fa-time"></i> Cancelar
        </button>
        <button class="btn btn-danger ml-2">
          <i class="fa fa-check"></i> Excluir conta
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$root.$emit('bv::hide::modal','delete-account-modal')
    }
  } 
}
</script>