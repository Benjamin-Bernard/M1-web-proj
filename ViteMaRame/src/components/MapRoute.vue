<template>
  <!--MAP-->
  <div id="map" ></div>
</template>

<script>
import leaflet from "leaflet";
import axios from "axios";

export default {
  name: "MapRoute",

  methods: {
    callAPI() {
      axios.get('https://db179dae-2cfa-49e3-8792-b608d70a3318@api.navitia.io/v1/coverage/fr-idf/journeys?from=2.3749036%3B48.8467927&to=2.2922926%3B48.8583736&')
          .then(response => console.log(response))
          .catch(err => console.log(err))
    }
  },
  mounted: function () {
    var map = leaflet.map('map').setView([51.505, -0.09], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    this.callAPI();
  }


}
</script>

<style scoped>
#map {
  height: 500px;
}
</style>