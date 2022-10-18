<template>
  <!--MAP-->
  <div id="map"></div>
</template>

<script>
import leaflet from "leaflet";
export default {
  name: "MapItineraire",

 mounted: function (){
       var map = L.map('map').setView([51.505, -0.09], 13);
       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       }).addTo(map);
 }

}
</script>

<style scoped>
#map { height: 500px; }
</style>