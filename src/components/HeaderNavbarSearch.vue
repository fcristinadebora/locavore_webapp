<template>
  <div class="w-100">
    <form
      class="form-inline w-100 d-flex justify-content-center justify-content-md-end"
      @submit.prevent="search"
    >
      <div class="input-group mt-2 mt-md-0 mr-0 pr-md-2 w-100 w-md-45">
        <input
          type="text"
          class="form-control border-0"
          placeholder="Buscar"
          aria-label="Buscar"
          v-model="form.search"
          aria-describedby="basic-addon2"
        />
      </div>
      <div class="input-group mt-2 mt-md-0 mr-0 pr-md-2 w-100 w-md-45 border-0">
        <div class="input-group-prepend">
          <span class="input-group-text border-white"
            ><i class="fas fa-map-marker-alt"></i
          ></span>
        </div>
        <input
          type="text"
          class="form-control border-white"
          placeholder="Local"
          :value="localTypeStr"
          readonly
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <b-button
            class="btn border-0 dropdown-toggle btn-light"
            type="button"
            data-toggle="dropdown"
            v-b-modal.modalEnderecoBusca
          ></b-button>
        </div>
      </div>
      <div class="input-group mt-2 mt-md-0 mr-0 p-0 w-100 w-md-10">
        <button class="btn btn-block bg-darker text-white">
          <i class="fas fa-search"></i>
          <span class="d-inline d-md-none">Buscar</span>
        </button>
      </div>
    </form>

    <b-modal
      id="modalEnderecoBusca"
      size="xl"
      class="text-center"
      title="Selecionar Local"
      :hide-footer="true"
      @shown="resetModal"
    >
      <div class="col-12">
        <label for="">Selecione uma cidade</label>
        <div class="row form-group">
          <div class="col-sm-5 pr-sm-0">
            <select class="form-control" v-model="location.estado">
              <option value="">Estado</option>
              <option
                :value="estado"
                v-for="(estado, index) in estados"
                :key="index"
              >
                {{ estado.nome }}
              </option>
            </select>
          </div>
          <div class="col-sm-5 px-sm-0">
            <select class="form-control" v-model="location.cidade">
              <option value="">Cidade</option>
              <option
                :value="cidade"
                v-for="(cidade, index) in cidades"
                :key="index"
              >
                {{ cidade.nome }}
              </option>
            </select>
          </div>
          <div class="col-sm-2 px-sm-0">
            <button
              class="btn-success btn btn-block"
              :disabled="!(location.cidade && location.estado)"
              @click="setLocation('city')"
            >
              <i class="fa fa-check"></i> Ok
            </button>
          </div>
        </div>
      </div>

      <div class="col-12" v-if="user">
        <label for="">Ou selecione um endereço</label>
        <div class="row form-group">
          <div class="col-sm-10 pr-sm-0">
            <input type="text" value="Carregando..." disabled class="form-control" v-if="!addresses">
            <input type="text" value="Nenhum endereço cadastrado" disabled class="form-control" v-if="addresses && !addresses.length">
            <select class="form-control" v-model="location.address" v-if="addresses && addresses.length">
              <option value="">Selecione um item da lista</option>
              <option
                :value="addr"
                v-for="(addr, index) in addresses"
                :key="index"
              >
                {{ addr.name }} | {{ addr.street }}, {{ addr.number }}...
              </option>
            </select>
          </div>
          <div class="col-sm-2 px-sm-0">
            <button
              class="btn-success btn btn-block"
              :disabled="!location.address"
              @click="setLocation('address')"
            >
              <i class="fa fa-check"></i> Ok
            </button>
          </div>
        </div>
      </div>

      <label class="col-12">Ou selecione no mapa abaixo</label>
      <div class="my-2 w-100 text-center">
        <div class="input-group mt-2 mt-md-0 mr-0 pr-md-2 col-12">
          <input
            type="text"
            readonly
            v-if="!location.coords"
            class="form-control"
            value="Selecione no mapa abaixo"
          />
          <input
            type="text"
            v-if="location.coords"
            readonly
            class="form-control border-success bg-success-opacity text-white"
            value="Localização selecionada!"
          />
          <div class="input-group-append">
            <button
              class="btn btn-sm btn-success"
              :disabled="!location.coords"
              @click="setLocation('coord')"
            >
              <i class="fa fa-check"></i> Ok
            </button>
          </div>
        </div>
      </div>

      <div class="col-12">
        <location-picker
          :key="locationPickerKey"
          @select-location="selectLocation"
        ></location-picker>
      </div>
    </b-modal>
  </div>
</template>

<script>
import LocationPicker from "@/components/LocationPicker"
import { EventBus } from '@/common/eventBus.js'

export default {
  components: {
    LocationPicker,
  },

  data() {
    return {
      form: {
        string: "",
        localType: null,
        local: {},
      },
      location: {
        cidade: "",
        estado: "",
        address: "",
        coords: false,
      },
      addresses: null,
      locationPickerKey: null,
    };
  },

  computed: {    
    estados() {
      const estados = Array.from(this.$store.getters["cidade/estados"]);

      if (estados) {
        return estados.sort((a, b) => a.nome > b.nome);
      }

      return [];
    },

    user(){
      if(this.$root.user){
        this.getAddresses()
      }

      return this.$root.user
    },

    cidades() {
      const cidades = Array.from(
        this.$store.getters["cidade/cidades"](this.location.estado.id)
      );

      if (cidades) {
        return cidades.sort((a, b) => a.nome > b.nome);
      }

      return [];
    },

    localTypeStr() {
      if (this.form.localType == "coord") {
        return "Posição do mapa";
      }

      if (this.form.localType == "city") {
        return `${this.form.local.city}, ${this.form.local.state}`;
      }

      if (this.form.localType == "address") {
        return `Endereço cadastrado: ${this.form.local.name}`;
      }

      return "";
    },
  },

  mounted () {
    if(this.$root.searchForm){
      this.form = this.$root.searchForm
    }else{
      this.$root.searchForm = this.form
    }
  },

  methods: {
    resetModal() {
      this.setLocationPickerKey();
    },

    setLocationPickerKey() {
      this.locationPickerKey = Math.random();
    },

    search() {
      this.$root.searchForm = this.form
      EventBus.$emit('search', 'search')
      if(this.$route.name != 'SearchResult'){
        this.$router.push("/busca")
      }
    },

    setLocation(type) {
      this.form.localType = type;

      if (type == "coord") {
        this.form.local = { ...this.location.coords }
      } else if (type == "address") {
        this.form.local = { ...this.location.address }
      } else if (type == "city") {
        this.form.local = {
          city: this.location.cidade.nome,
          state: this.location.estado.nome,
        };
      }

      this.$bvModal.hide("modalEnderecoBusca");
    },
    
    selectLocation(location) {
      this.location.coords = location;
    },

    getAddresses() {
      this.$store
        .dispatch("address/get", {
          params: {
            all: true,
            user_id: this.$root.user ? this.$root.user.id : null
          }
        })
        .then((response) => {
          this.addresses = response.data
        })
        .catch((error) => {
          this.addresses = [];
          console.error("Falha ao obter endereços", error);
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-success-opacity {
  background-color: rgba(40, 167, 69, 0.8) !important;
}
.bg-darker {
  background: linear-gradient(87deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.25));
}
</style>