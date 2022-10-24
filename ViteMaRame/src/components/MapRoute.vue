<template>
  <!--MAP-->
  <div id="map"></div>
</template>

<script>
import leaflet from "leaflet";
import http from "../http-common.js";

export default {
  name: "MapRoute",
  //Lien pour l'info traffic
  // https://api.navitia.io/v1/coverage/fr-idf/disruptions?data_freshness=realtime&
  //Lien pour gérer l'info traffic selon les coordonnées
  // https://api.navitia.io/v1/coverage/fr-idf/disruptions?from=2.37768%3B48.85334&to=2.2922926%3B48.8583736&
  // https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.37768%3B48.85334&to=2.2922926%3B48.8583736&

//https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.25425%3B48.82106&to=2.36373%3B48.78867&
  //'https://api.navitia.io/v1/coverage/fr-idf/journeys?from='+from[0]+'%3B'+from[1]+'&=to'+to[0]+'%3B'+to[1]+'&'
  data() {
    return {}
  },
  methods: {
    async callAPI(from,to) {
      await http.get('https://api.navitia.io/v1/coverage/fr-idf/journeys?from=' + from[0] + '%3B' + from[1] + '&to=' + to[0] + '%3B' + to[1] + '&count=3&')
          .then((response) => {
            localStorage.setItem('routes', JSON.stringify(response.data));
          })
          .catch(err => console.log(err))
    },
    drawRoutes(map) {
      const routeTab = JSON.parse(localStorage.getItem('routes'));
      const sections = [];
      const myStyle = {
        color: "",
        weight: 3,
        dashArray: ''
      };
      const circleMarker = {
        color: myStyle.color,
        fill: true,
        fillOpacity: 0.8,
        fillColor: 'white',
        weight: 1,
        radius:5
      };

      routeTab.journeys.forEach((element) => {
        sections.push(element.sections);
      })

      sections.forEach((element1) => {

        element1.forEach((element2) => {
          myStyle.color = element2.type == "public_transport" ? "#" + element2.display_informations.color : '#000';

          myStyle.dashArray = element2.type == "street_network" || element2.type == "transfer" ? '5,10' : '';

          if (element2.geojson != null) {

            leaflet.geoJSON(element2.geojson, {
              style: myStyle,
            }).addTo(map);

            if (element2.type == "public_transport") {

              element2.stop_date_times.forEach((element4) => {
                element2.geojson.coordinates.forEach((element3) => {
                  leaflet.circleMarker([element3[1], element3[0]], circleMarker, circleMarker.color = myStyle.color)
                      .bindPopup(element4.stop_point.name)
                      .addTo(map);
                })
              })
            }
          }
        })

      });
    }
  },
  mounted: async function () {
    const map = leaflet.map('map').setView([48.8534100, 2.3488000], 13);
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const adressData = JSON.parse(localStorage.getItem('adresse_route'));
    const from = adressData.depart.geometry.coordinates;
    const to = adressData.destination.geometry.coordinates;

    leaflet.marker([from[1], from[0]]).bindPopup("Start").addTo(map);
    leaflet.marker([to[1],to[0]]).bindPopup("End").addTo(map);

    await this.callAPI(from,to);

    this.drawRoutes(map);

  }


}
</script>

<style scoped>
#map {
  height: 800px;
}
</style>