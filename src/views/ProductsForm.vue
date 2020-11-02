<template>
  <page>
    <span slot="content">
      <form @submit.prevent="save">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">
          Meus produtos
          <span class="text-sm">
            <i class="fa fa-angle-right"></i> {{actionStr}}</span
          >
        </h1>

        <div>
          <router-link to="/produtos" class="btn btn-warning btn-sm mr-2">
            <i class="fa fa-times"></i> Cancelar
          </router-link>

          <button
            to="/produtos/cadastro"
            class="btn bg-gradient btn-sm text-white"
          >
            <i class="fa fa-check"></i> Salvar
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body text-center" v-if="$route.params.id && !this.currentProduct">
          <i class="fa fa-spinner fa-pulse"></i> Carregando...
        </div>
        <div class="card-body text-left" v-if="!$route.params.id || ($route.params.id && this.currentProduct)">
          <div class="row">
            <div class="form-group col-md-4">
              <label for="">Nome <span class="text-danger">*</span></label>
              <input type="text" v-model="form.name" class="form-control" required />
            </div>
            <div class="form-group col-md-4">
              <label for="">Categoria <span class="text-danger">*</span></label>
              <input type="text" class="form-control" readonly v-if="!categories" value="Carregando..." />

              <select class="form-control" required v-if="categories" v-model="form.product_category_id">
                <option value="">Selecione uma opção</option>
                <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.description }}</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="">Valor (R$)</label>
              <input type="number" class="form-control" v-model="form.price" />
            </div>
            <div class="form-group col-12">
              <label for="">Detalhes</label>
              <wysiwyg class="w-100"  v-model="form.description" />
            </div>
            <div class="form-group col-12">
              <label for="">Tags</label>
              <input type="text" class="form-control" readonly v-if="!tags" value="Carregando..." />

              <multiselect v-if="tags" v-model="form.tags" tag-placeholder="Adicionar nova tag" placeholder="Buscar ou adicionar tag" label="description" track-by="id" :options="tags" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
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
export default {
  components: {
    Page,
  },

  data() {
    return {
      categories: null,
      tags: null,
      form: {},
      currentProduct: null
    };
  },

  mounted() {
    this.getCategories()
    this.getTags()
    this.resetForm()

    if(this.$route.params.id){
      this.getProductData()
    }
  },

  computed:{
    actionStr () {
      return this.$route.params.id ? 'Editar' : 'Cadastro'
    }
  },

  methods: {
    getCategories() {
      this.$store
        .dispatch("productCategory/fetchFromApi")
        .then((response) => {
          this.categories = Array.from(response.data.categories);
        })
        .catch((error) => {
          console.error("Falha ao obter categorias disponíveis", error);
          this.categories = [];
        });
    },

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
      this.form.tags.push(tag)
    },

    resetForm() {
      this.form = {
        user_id: this.$root.user.id,
        id: this.$route.params.id ? this.$route.params.id : null,
        name: null,
        product_category_id: '',
        tags: [],
        price: null,
        description: null,
      }
    },

    getProductData(){
      this.$store.dispatch('product/getById', { id:this.form.id, params: { with_tags: true } })
      .then((response) => {
        this.currentProduct = response.data.product
        this.form = {
          ...this.form,
          name: this.currentProduct.name,
          product_category_id: this.currentProduct.product_category_id,
          price: this.currentProduct.price,
          description : this.currentProduct.description,
          tags: this.currentProduct.tags.map(tag => tag.tag),
        }
      })
      .catch(error => {
        var message = 'Falha ao carregar dados do produto!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },

    save() {
      if(this.form.id){
        this.update()  
      }else{
        this.create()
      }
      
    },

    create () {
      const data = {...this.form}

      this.$store.dispatch('product/create', { data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Produto cadastrado com sucesso!",
          icon: "success",
        })

        this.$router.push('/produtos')
      })
      .catch(error => {
        var message = 'Falha ao cadastrar produto!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    },

    update () {
      const data = {...this.form}

      this.$store.dispatch('product/update', { id: this.form.id, data: data})
      .then(() => {
        this.$swal.fire({
          title: "Ok!",
          text: "Produto atualizado com sucesso!",
          icon: "success",
        })

        this.$router.push('/produtos')
      })
      .catch(error => {
        var message = 'Falha ao atualizar produto!';
        
        this.$swal.fire({
          title: "Oops!",
          text: message,
          icon: "error",
        })

        console.error(message, error)
      })
    }
  },
};
</script>