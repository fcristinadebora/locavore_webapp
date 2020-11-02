<template>
  <page>
    <span slot="content">
      <h1 class="h4 w-100 text-center my-3">Resultados da busca</h1>

      <div id="mapContainer"></div>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page"
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  components: {
    Page
  },

  data() {
    return {
      center: [-27.232240,-52.022991],
      lastZoom: 15,
      maxDistance: 5,
      myIcon: null,
      icon: {
        iconUrl: require("@/assets/img/marker.png"),
        iconSize: [20, 30],
        popupAnchor: [0, -17],
        shadowUrl: require("@/assets/img/markerShadow.png"),
        shadowSize: [30, 35],
        shadowAnchor: [10, 20],
      },
      markers: [],
      mapDiv: null
    };
  },

  computed: {
    products() {
      const items = this.$store.getters["product/items"];

      return items;
    },

    favorites() {
      const items = this.$store.getters["favorite/items"];

      if(!items) {
        this.$store.dispatch("favorite/fetchFromApi", { params: {
          user_id: this.$root.user.id
        }})
      }

      console.log('items', items)

      return items;
    },
    growers() {
      const items = this.$store.getters["grower/items"];

      return items;
    },
  },

  mounted() {
    this.myIcon = L.icon(this.icon);
    
    this.doSearch()
    this.setupLeafletMap()
  },

  methods: {
    doSearch() {
      if (this.$root.searchForm.localType == "coord") {
        this.center = [this.$root.searchForm.local.lat, this.$root.searchForm.local.long]
      }

      if(this.$route.params.type == 'produtos'){
        this.getProducts()
      }

      if(this.$route.params.type == 'produtores'){
        this.getGrowers()
      }
    },

    getGrowers() {
      var params = {};

      if (this.$root.searchForm.localType == "coord") {
        params = {
          lat: this.$root.searchForm.local.lat,
          long: this.$root.searchForm.local.long,
        };
      } else if (this.$root.searchForm.localType == "city") {
        params = {
          city: this.$root.searchForm.local.city,
          state: this.$root.searchForm.local.state,
        };
      }

      params = {
        ...params,
        search_string: this.$root.searchForm.search,
        order_by: "distance",
      };

      this.$store
        .dispatch("grower/get", {
          params: params,
        })
        .then((response) => {
          response.data.data.forEach(element => {
            this.addGrowerMarker(element)
          });
        })
        .finally(() => {})
    },

    getProducts() {
      this.activeTab = "products";
      var params = {};

      if (this.$root.searchForm.localType == "coord") {
        params = {
          lat: this.$root.searchForm.local.lat,
          long: this.$root.searchForm.local.long,
        };
      } else if (this.$root.searchForm.localType == "city") {
        params = {
          city: this.$root.searchForm.local.city,
          state: this.$root.searchForm.local.state,
        };
      }

      params = {
        ...params,
        search_string: this.$root.searchForm.search,
        order_by: "distance",
      }

      this.$store
        .dispatch("product/get", {
          params: params,
        })
        .then((response) => {
          response.data.data.forEach(element => {
            this.addProductMarker(element)
          });
        })
        .finally(() => {
        })
    },

    setupLeafletMap: function () {
      const mapDiv = L.map("mapContainer").setView(this.center, this.lastZoom);
      this.mapDiv = mapDiv
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
        {
          id: "mapbox/streets-v11",
          accessToken:
            "sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
        }
      ).addTo(mapDiv);

      L.marker(this.center, { icon: this.myIcon })
        .addTo(mapDiv)
        .bindPopup('Você está aqui')
        .openPopup();

      mapDiv.on('zoomend',this.handleZoomed)

    },

    addProductMarker (product) {
      var content = `<strong>${product.name}</strong><br>`
      content += `${product.street}, `
      content += `${product.number ? product.number : 'Sem número'}, `
      content += `${product.complement ? `${product.complement}, ` : '' } `
      content += `${product.district}`

      this.addMarker(content, product.lat, product.long)
    },

    addGrowerMarker (grower) {
      var content = `<strong>${grower.name}</strong><br>`
      content += `${grower.street}, `
      content += `${grower.number ? grower.number : 'Sem número'}, `
      content += `${grower.complement ? `${grower.complement}, ` : '' } `
      content += `${grower.district}`

      this.addMarker(content, grower.lat, grower.long)
    },
  

    addMarker(content, lat, long){
      L.marker([lat, long], { icon: this.myIcon })
        .addTo(this.mapDiv)
        .bindPopup(content);
    },

    handleZoomed (e) {
      console.log(e)
      console.log(this.mapDiv.getZoom())
    }

  },
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 55vh;
}
</style>