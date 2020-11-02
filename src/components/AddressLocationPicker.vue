<template>
  <div id="container-fluid">
    <div id="locationPickerContainerAddress"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Lmap from "leaflet";

export default {
  name: "Map2",
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
      const addrMapDiv = Lmap.map("locationPickerContainerAddress").setView(this.center, 20);
      Lmap.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
        {
          id: "mapbox/streets-v11",
          accessToken:
            "sk.eyJ1IjoiZGFvcmFoZWluIiwiYSI6ImNrZ3h1YXp5dTA0bmIycmswMWZsY3AwcTMifQ.B10yLUXLOS3SvHJAeifQjg",
        }
      ).addTo(addrMapDiv);

      var myIcon = Lmap.icon(this.icon);

      var addrMarker = Lmap.marker(this.center, { icon: myIcon })
        .addTo(addrMapDiv)
        .bindPopup("Você está aqui")
        .openPopup();

      addrMapDiv.on("click", (e) => {
        var newLatLng = new Lmap.LatLng(e.latlng.lat, e.latlng.lng);
        addrMarker.setLatLng(newLatLng); 
        addrMapDiv.panTo(newLatLng);
        this.center = [e.latlng.lat, e.latlng.lng] 
        this.emitLocation()
      });
    },

    getGeolocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.$root.geolocation = position.coords;

          console.log(this.$root.geolocation)

          this.center = [this.$root.geolocation.latitude, this.$root.geolocation.longitude]

          this.setupLeafletMap()
        },
        (error) => {
          this.$swaLmap.fire({
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
#locationPickerContainerAddress {
  width: 100%;
  height: 55vh;
}
</style>