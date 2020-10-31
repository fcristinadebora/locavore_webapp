<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">
          Imagens da página (produtor)
        </h1>
      </div>

      <div class="alert alert-info">
        <i class="fa fa-info-circle"></i> Use essa tela para enviar imagens que irão aparecer nos detalhes de sua página de produtor
      </div>

      <div class="card mb-3">
        <div class="card-header text-center">Enviar arquivos</div>
        <div class="card-body text-center">
          <div class="form-group">
            <file-upload :key="hideFileUpload" target-url="images-multiple" @upload="saveImages" :multiple="true" accept="image/*"></file-upload>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header text-center">Imagens cadastradas</div>

        <div class="card-body text-center" v-if="!images">
          <i class="fa fa-spinner fa-pulse"></i> Carregando...
        </div>

        <div class="card-body text-center" v-if="images && images.length == 0">
          Nenhum item cadastrado
        </div>

        <div class="card-body" v-if="images">
          <div class="row">
            <div class="col-md-4 my-3" v-for="(image, index) in images" :key="index">
              <div class="col-12 border-color1 py-3 bg-light rounded">
                <img :src="apiAddr + image.file_path + image.file_name" class="w-100">
                <div class="form-group w-100 pt-3">
                  <div class="input-group">
                    <input type="text" class="form-control" :disabled="!form[index].editing" v-model="form[index].title" placeholder="Título da imagem">
                    <div class="input-group-append">
                      <button class="btn btn-warning" type="button" v-if="!form[index].editing" @click="form[index].editing = true"><i class="fa fa-edit"></i></button>
                      <button class="btn btn-success" type="button" v-if="form[index].editing" @click="save(index)"><i class="fa fa-check"></i></button>
                      <button class="btn btn-danger" type="button" @click="deleteItem(index)"><i class="fa fa-trash"></i></button>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page"
import FileUpload from "@/components/FileUpload"
import { getApiUrl } from "@/common/api"

export default {
  components: {
    Page,
    FileUpload
  },

  data() {
    return {
      images: null,
      apiAddr: getApiUrl(),
      hideFileUpload: false,
      form: []
    }
  },

  mounted () {
    this.getImages()
  },

  computed: {
    growerId (){
      return this.$root.user ? this.$root.user.id : null
    }
  },

  methods: {
    saveImages (response){
      const data = {
          images: response.data.images.map(item => {
            return item.id
          })
      }

      this.$store.dispatch('grower/attachImages', {
        id: this.growerId,
        data: data
      })
      .then(() => {
        this.hideFileUpload = Math.random()
        this.getImages()
      })
      .catch(error => {
        console.error(error)
        console.log("Falha ao enviar as imagens")
      })
    },
     
    getImages(){
      this.$store.dispatch('grower/getImages', {
        id: this.growerId
      })
      .then(response => {
        this.images = response.data.images.map(image => {
          return image.image
        })

        this.form = []
        this.images.forEach(img => {
          this.form.push({
            id: img.id,
            title: img.title,
            editing: false
          })
        })
        console.log('Imagens carregadas com sucesso')
      })
      .catch(error => {
        console.error(error)
        console.log("Falha ao enviar as imagens")
      })
    },

    save(index){
      const data = this.form[index]

      this.$store.dispatch('image/update', {id: data.id, data:data})
        .then(response => {
          this.$swal.fire({
            title: "Ok!",
            text: "Dados atualizados com sucesso!",
            icon: "success",
          })

          this.images[index] = response.data.updated
          this.form[index].editing = false
        })
        .catch(error => {
          this.$swal.fire({
            title: "Oops!",
            text: "Falha ao atualizar os dados.",
            icon: "error",
          })

          console.log('error', error)
        })
    },

    deleteItem(index){
      this.$swal.fire({
        title: 'Deseja excluir o item?',
        text: "Não será possível desfazer essa ação",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Excluir'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('image/delete', {id: this.form[index].id})
          .then(() => {
            this.$swal.fire({
              title: "Ok!",
              text: "Item excluído!",
              icon: "success",
            })
            
            this.images = null
            this.getImages()
          })
          .catch((error) => {
            this.$swal.fire({
              title: "Oops!",
              text: "Falha ao excluir item",
              icon: "error",
            })

            console.error('falha ao excluir item', error)
          })
        }
      })
    }
  }

}
</script>