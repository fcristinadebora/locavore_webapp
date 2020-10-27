<template>
  <page>
    <span slot="content">
      <span class="btn btn-block bg-gradient text-white mb-3 font-weight-bold">Bem-vindo(a) ao Locavore!</span>

      <b-card no-body v-if="user">
        <b-tabs pills card fill active-nav-item-class="bg-gradient">
          <b-tab title="Produtores Favoritos" active>
            <b-card-text
              >Você ainda não favoritou nenhum produtor. Busque e favorite seus
              produtores favoritos para vê-los em sua tela inicial</b-card-text
            >
          </b-tab>
          <b-tab title="Interesses">
            <b-card-text
              >Você ainda não informou nenhum interesse.
              <a href="">Clique aqui</a> para gerenciar seus interesses e ver
              resultados compatíveis em sua tela inicial</b-card-text
            >
          </b-tab>
        </b-tabs>
      </b-card>

      <b-card no-body v-if="!user">
        <b-tabs
          pills
          card
          fill
          active-nav-item-class="bg-gradient"
          class="text-center"
        >
          <b-tab title="Produtores Favoritos" active>
            <b-card-text
              >Para visualizar seus produtores favoritos em sua tela inicial<br /><br />
              <router-link class="btn bg-color1 text-white btn-sm" to="/login"
                >faça login</router-link
              >
              ou
              <router-link
                class="btn bg-color1 text-white btn-sm"
                to="/cadastro"
                >cadastre-se</router-link
              >
            </b-card-text>
          </b-tab>
          <b-tab title="Interesses">
            <b-card-text
              >Para visualizar resultados compatíveis com seus interesses
              <br /><br />
              <router-link class="btn bg-color1 text-white btn-sm" to="/login"
                >faça login</router-link
              >
              ou
              <router-link
                class="btn bg-color1 text-white btn-sm"
                to="/cadastro"
                >cadastre-se</router-link
              >
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
export default {
  components: {
    Page,
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