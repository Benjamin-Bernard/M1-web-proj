<template>
  <!--MAP-->
  <div id="map" ></div>
</template>

<script>
import leaflet from "leaflet";
import http from "../http-common.js";

export default {
  name: "MapRoute",
  //Lien pour l'info traffic
  // https://api.navitia.io/v1/coverage/fr-idf/disruptions?data_freshness=realtime&
  //Lien pour gérer l'info selon les coordonnées
 // https://api.navitia.io/v1/coverage/fr-idf/disruptions?from=2.37768%3B48.85334&to=2.2922926%3B48.8583736&
  methods: {
    async callAPI() {
      await http.get('https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.37768%3B48.85334&to=2.2922926%3B48.8583736&')
          .then((response) => {
            console.log(response);
            localStorage.setItem('itineraire', JSON.stringify(response.data));
          })
          .catch(err => console.log(err))
    }
  },
  mounted: function () {
    var map = leaflet.map('map').setView([48.8534100, 2.3488000], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var latlngs = [
      [48.825051, 2.273457],
      [48.892956, 2.288168],
    ];

     leaflet.polyline(latlngs, {color: 'red'}).addTo(map);

    this.callAPI();
  }


}
</script>

<style scoped>
#map {
  height: 800px;
}
</style>