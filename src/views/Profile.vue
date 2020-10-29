<template>
  <page>
    <span slot="content">
      <form @submit.prevent="save">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Meu Perfil</h1>

        <div>
          <a
            class="btn btn-warning btn-sm"
            @click="setEditing()"
            v-if="!editing"
          >
            <i class="fa fa-edit"></i> Editar
          </a>
          <a
            class="btn btn-warning btn-sm mr-2"
            @click="setEditing()"
            v-if="editing"
          >
            <i class="fa fa-times"></i> Cancelar
          </a>
          <button
            class="btn bg-gradient btn-sm"
            v-if="editing"
          >
            <i class="fa fa-check"></i> Salvar
          </button>
        </div>
      </div>

      <div class="col-12">
        <div class="row justify-content-center">
          <div
            class="col-md-2 col-10 p-0 overflow-auto rounded-circle justify-content-center align-items-center d-flex border-color1 border profile-img"
            :style="
              'background: url(' +
              profileImageUrl +
              '); height:' +
              profileImageHeightPx +
              ';'
            "
            ref="profileimg"
          >
            <i class="fa fa-pulse fa-spinner" v-if="!profile"></i>
            <i
              class="fa fa-user"
              style="font-size: 50px"
              v-if="profile && !profileImageUrl"
            ></i>
          </div>
          <div
            class="col-md-10 pt-4 pl-0 pl-md-4 d-flex align-items-center justify-content-center justify-content-md-start"
            v-if="profile"
          >
            <div v-if="!editing">
              <div class="font-weight-bold w-100 mb-3">
                {{ profile.name }}
              </div>
              <div class="w-100 mb-3">
                {{ profile.email }}
              </div>
              <div class="w-100 mb-3">
                <span class="badge bg-gradient w-100 w-md-auto">
                  {{ profile.is_grower ? "Perfil produtor" : "Perfil padrão" }}
                </span>
              </div>
            </div>

            <div v-if="editing" class="w-100">
              <div class="form-group row mt-2">
                <file-upload target-url="images" @upload="setProfileImage"></file-upload>
              </div>
              <div class="form-group row">
                <label class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                  >Nome:
                </label>
                <div class="col-md-9 col-lg-10">
                  <input type="text" class="form-control" v-model="form.name" required />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                  >E-mail:
                </label>
                <div class="col-md-9 col-lg-10">
                  <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 col-lg-2 col-form-label font-weight-bold"
                  >Perfil:
                </label>
                <div class="col-md-9 col-lg-10">
                  <select class="form-control" v-model="form.is_grower">
                    <option :value="0">Perfil padrão</option>
                    <option :value="1">Produtor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row pr-3" v-if="(profile && profile.is_grower && !editing) || (editing && form.is_grower)">
            <div class="form-group col-12">
              <label class="col-form-label font-weight-bold">Descrição</label>
              <p v-html="profile.description" v-if="!editing"></p>
              <wysiwyg
                v-model="form.description"
                v-if="editing"
                class="w-100"
              />
            </div>

            <div class="form-group col-12">
              <label class="col-form-label font-weight-bold">Tags</label>

              <div class="w-100" v-if="!editing">
                <p v-if="!profile.tags">Nenhuma tag associada</p>

                <span class="badge bg-gradient text-white mr-2" v-for="(tag, index) in profile.tags" :key="index">
                  {{ tag.description }}
                </span>
              </div>

              <multiselect v-if="editing" v-model="form.tags" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="description" track-by="id" :options="availableTags" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            </div>


            
          </div>
        </div>
      </div>
      </form>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
import FileUpload from "@/components/FileUpload";
import { getApiUrl } from "@/common/api";
export default {
  components: {
    Page,
    FileUpload
  },

  data() {
    return {
      profileImageHeight: "0px",
      editing: false,
      profile: null,
      form: {},
      value: [
        { description: 'Javascript', id: 'js' }
      ],
      availableTags: []
      
    };
  },

  computed: {
    profileImageHeightPx() {
      return this.profileImageHeight;
    },

    profileImageUrl() {
      if (this.profile && this.profile.profile_file_name) {
        return (
          getApiUrl() +
          this.profile.profile_file_path +
          this.profile.profile_file_name
        );
      }

      return false;
    },
  },

  created() {
    window.addEventListener("resize", this.setProfileImageHeight)
  },

  mounted() {
    this.setProfileImageHeight()
    this.getProfile()
    this.getAvailableTags()
  },

  methods: {
    setProfileImageHeight() {
      this.profileImageHeight = this.$refs.profileimg.clientWidth + "px"
    },

    setEditing() {
      this.form = {
        ...this.profile,
        tags: this.profile.tags
      }

      this.editing = !this.editing
    },

    addTag (newTag) {
      const tag = {
        description: newTag,
        id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
        type: 'new'
      }
      this.availableTags.push(tag)
      this.form.tags.push(tag)
    },

    getProfile() {
      this.$store.dispatch("user/getProfile")
      .then(response => {
        this.profile = response.data.profile
        if(this.profile.is_grower){
          this.getGrowerTags()
        }
      })
      .catch(error => {
        console.error('Falha ao obter tags', error)
        return []
      })
    },

    getGrowerTags () {
      this.$store.dispatch("grower/getById", {
        id: this.profile.id,
        params: {
          with_tags: true,
        }
      })
      .then(response => {
        console.log(response)

        if(response.data.grower.identification_tags.length){
          this.profile = {
            ...this.profile,
            tags: response.data.grower.identification_tags.map(tag => tag.tag)
          }

          return true
        }

        this.profile.tags = []
        return true
      })
      .catch(error => {
        console.error('Falha ao obter tags', error)
        this.profile.tags = []
      })
    },

    getAvailableTags () {
      this.$store.dispatch("tag/fetchFromApi")
      .then(response => {
        this.availableTags = Array.from(response.data.tags)
      })
      .catch(error => {
        console.error('Falha ao obter tags disponíveis', error)
        this.availableTags = []
      })
    },

    save() {
      if(this.form.is_grower){
        this.saveGrower()
      }else{
        this.saveDefault()
      }
    },

    saveGrower() {
      const data = {...this.form}

      this.$store.dispatch('grower/update', { id: this.form.id, data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Dados alterados com sucesso!",
          icon: "success",
        })

        this.getGrowerTags()
        this.getProfile()
        this.setEditing()
      })
      .catch(error => {
        var message = 'Falha ao atualizar os dados!';
        if(error.response.data.email){
          message = error.response.data.email[0]
        }

        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })
      })
    },

    saveDefault(){
      const data = {...this.form}

      this.$store.dispatch('user/update', { id: this.form.id, data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Dados alterados com sucesso!",
          icon: "success",
        })

        this.getProfile()
        this.setEditing()
      })
      .catch(error => {
        var message = 'Falha ao atualizar os dados!';
        if(error.response.data.email){
          message = error.response.data.email[0]
        }

        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })
      })
    },

    setProfileImage(response){
      if(response.data.image){
        this.form = {
          ...this.form,
          profile_file_name: response.data.image.file_name,
          profile_file_path: response.data.image.file_path,
          image_id: response.data.image.id
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.profile-img {
  background-size: cover !important;
  background-color: #ccc !important;
  background-position: center !important;
}
</style>