<template>
  <div id="container-fluid">
    <div id="locationPickerContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  data() {
    return {
      center: null,
      icon: {
        iconUrl: require("@/assets/img/marker.png"),
        iconSize: [20, 30],
        popupAnchor: [0, -17],
        shadowUrl: require("@/assets/img/markerShadow.png"),
        shadowSize: [30, 35],
        shadowAnchor: [10, 20],
      },
    };
  },

  mounted() {
    this.getGeolocation();
  },

  methods: {
    setupLeafletMap: function () {
      const mapDiv = L.map("locationPickerContainer").setView(this.center, 20);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
        {
          id: "mapbox/streets-v11",
          accessToken:
            "sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
        }
      ).addTo(mapDiv);

      var myIcon = L.icon(this.icon);

      var marker = L.marker(this.center, { icon: myIcon })
        .addTo(mapDiv)
        .bindPopup("Você está aqui")
        .openPopup();

      mapDiv.on("click", (e) => {
        var newLatLng = new L.LatLng(e.latlng.lat, e.latlng.lng);
        marker.setLatLng(newLatLng); 
        mapDiv.panTo(newLatLng);
        this.center = [e.latlng.lat, e.latlng.lng] 
        this.emitLocation()
      });
    },

    getGeolocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.$root.geolocation = position.coords;

          this.center = [this.$root.geolocation.latitude, this.$root.geolocation.longitude]

          this.setupLeafletMap()
        },
        (error) => {
          this.$swal.fire({
            title: "Autorizar geolocalização",
            text:
              "Por favor, autorize o serviço de geolocalização para otimizar sua busca!",
            icon: "warning",
          });
          
          console.log(error.message)
          this.center = [-27.232240,-52.022991]

          this.setupLeafletMap()
        }
      )
    },

    emitLocation() {
      this.$emit('select-location', {
        lat: this.center[0],
        long: this.center[1]
      })
    }
  }
};
</script>

<style scoped>
#locationPickerContainer {
  width: 100%;
  height: 55vh;
}
</style>