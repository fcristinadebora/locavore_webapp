<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h3">Meus interesses</h1>
      </div>

        
          <div class="input-group">
            <div class="input-group my-3 mr-0 w-100">
              <input
                type="text"
                class="form-control"
                placeholder="Adicionar palavra chave"
                aria-label="Buscar"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn bg-gradient text-white border-secondary"
                  type="button"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <table class="w-100 table table-striped ">
              <thead>
                  <tr>
                      <th colspan="2" class="text-center">Palavras-chave cadastradas</th>
                  </tr>
              </thead>
            <tbody>
              <tr v-for="i in 10" :key="i">
                <td class="v-middle">Maçã</td>
                <td style="width: 45px" class="text-right">
                  <button class="btn btn-sm btn-danger text-extra-sm">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
export default {
  components: {
    Page,
  },

  data() {
    return {
      i: 1,
    };
  },
  computed: {
    user() {
      const user = this.$store.getters["user/user"];

      console.log(user);

      if (user === null) {
        this.$store.dispatch("user/authenticated");
      }

      return user;
    },
  },
};
</script>