<template>
  <b-modal
    id="change-password-modal"
    class="text-center"
    title="Alterar senha"
    :hide-footer="true"
    >
    <form action="">
      <div class="form-group">
        <label for="">Senha atual</label>
        <input type="text" name="" id="" class="form-control">
      </div>
      <div class="form-group">
        <label for="">Nova senha</label>
        <input type="text" name="" id="" class="form-control">
      </div>
      <div class="form-group">
        <label for="">Confirmar senha</label>
        <input type="text" name="" id="" class="form-control">
      </div>
      <div class="form-group text-right">
        <button class="btn btn-secondary" type="button" @click="closeModal()">
          <i class="fa fa-time"></i> Cancelar
        </button>
        <button class="btn btn-success ml-2">
          <i class="fa fa-check"></i> Salvar
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$root.$emit('bv::hide::modal','change-password-modal')
    }
  } 
}
</script>