<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Meus interesses</h1>
      </div>

        
          <div class="input-group">
            <div class="input-group my-3 mr-0 w-100">
              <div class="w-100"></div>
              <multiselect v-model="form.tag" class="form-control p-0 border-0" tag-placeholder="Adicionar nova tag" placeholder="Buscar ou adicionar tag" label="description" track-by="id" :options="tags" :multiple="false" :taggable="true" @tag="addTag"></multiselect>
              <div class="input-group-append">
                <button
                  class="btn bg-gradient text-white"
                  type="button"
                  @click="create()"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <table class="w-100 table table-striped">
              <thead>
                  <tr>
                      <th colspan="2" class="text-center">Palavras-chave cadastradas</th>
                  </tr>
              </thead>
            <tbody>
              <tr v-if="user && !userTags">
                <td colspan="2" class="v-middle text-center"><i class="fa fa-pulse fa-spinne"></i> Carregando...</td>
              </tr>
              <tr v-if="user && userTags && !userTags.data.length">
                <td colspan="2" class="v-middle text-center">Nenhum item localizado</td>
              </tr>
            </tbody>
            <tbody v-if="user && userTags">
              <tr v-for="(tag, index) in userTags.data" :key="index">
                <td class="v-middle">{{ tag.tag.description }}</td>
                <td style="width: 45px" class="text-right">
                  <button class="btn btn-sm btn-danger text-extra-sm" type="button" @click="deleteInterest(tag.id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="w-100">
            <b-pagination v-model="currentPage" :per-page="15" @change="changePage" align="center" pills :total-rows="totalTags"></b-pagination>
          </div>
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
      tags: [],
      form:{
        tag: {}
      },
      totalTags: 0,
      currentPage: 1,
      userTags: null
    }
  },

  computed: {
    user () {
      if(this.$root.user){
        this.getTags()
        this.getInterests()
        return true
      }

      return false
    }
  },

  methods: {
    getTags () {
      this.$store.dispatch("tag/fetchFromApi")
      .then(response => {
        this.tags = Array.from(response.data.tags)
      })
      .catch(error => {
        console.error('Falha ao obter tags disponíveis', error)
        this.tags = []
      })
    },

    addTag (newTag) {
      const tag = {
        description: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
        type: 'new'
      }
      this.tags.push(tag)
      this.form.tag = tag
    },

    changePage (newPage) {
      this.currentPage = newPage
      this.getInterests()
    },

    create () {
      const data = {
        ...this.form,
        user_id: this.$root.user.id
      }

      this.$store.dispatch('interest/create', { data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Tag cadastrada com sucesso!",
          icon: "success",
        })

        this.currentPage = 1
        this.form.tag = null
        this.getInterests()
      })
      .catch(error => {
        var message = 'Falha ao cadastrar tag!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },

    getInterests () {
      this.$store
        .dispatch("interest/get", {
          params: {
            page: this.currentPage,
            user_id: this.$root.user.id
          },
        })
        .then(response => {
          if(response.data){
            this.totalTags = response.data.total
          }

          this.userTags = response.data
        })
        .catch(() => {
          this.$swal.fire({
          title: "Oops!",
          text: 'Falha ao obter tags',
          icon: "error",
        })
      })
    },

    deleteInterest (id) {
      this.$store.dispatch('interest/delete', { id: id})
      .then(() => {
        this.currentPage = 1
        this.getInterests()
      })
      .catch(error => {
        var message = 'Falha ao excluir tag!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },
  }
};
</script>