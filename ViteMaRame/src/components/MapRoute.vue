<template>
  <!--MAP-->
  <div class="map_container">
    <div class="list_journeys">
      <button @click="addFavourite" class="button">Add Favorite</button>
      <h1>Map</h1>
      <div id="map"></div>
      <h1>Journeys found : {{ sections.length }}</h1>
      <table v-for="section in sections" :key="section">
        <thead>
          <tr>
            <th>Section</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>From</th>
            <th>To</th>
            <th>Mode</th>
            <th>Type</th>
            <th>Physical Mode</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody v-for="(sec, index) in section" :key="index">
          <tr v-if="sec.type != 'waiting'">
            <td>{{ index }}</td>
            <td>{{ formatHour(sec.departure_date_time) }}</td>
            <td>{{ formatHour(sec.arrival_date_time) }}</td>
            <td v-if="sec.from != null">{{ sec.from.name }}</td>
            <td v-if="sec.to != null">{{ sec.to.name }}</td>
            <td>{{ sec.mode }}</td>
            <td>{{ sec.type }}</td>
            <td v-if="sec.display_informations != null">
              {{ sec.display_informations.commercial_mode }}
            </td>
            <td v-if="sec.display_informations != null">
              {{ sec.display_informations.code }}
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import http from "../http-common.js";
export default {
  name: "MapRoute",
  data() {
    return {
      sections: [],
    };
  },
  methods: {
    async callAPI(from, to) {
      await http
        .get(
          "https://api.navitia.io/v1/coverage/fr-idf/journeys?from=" +
            from[0] +
            "%3B" +
            from[1] +
            "&to=" +
            to[0] +
            "%3B" +
            to[1] +
            "&count=3&"
        )
        .then((response) => {
          localStorage.removeItem("journeys");
          localStorage.setItem(
            "journeys",
            JSON.stringify(response.data.journeys)
          );
        })
        .catch((err) => console.log(err));
    },
    drawRoutes(map) {
      const routeTab = JSON.parse(localStorage.getItem("journeys"));
      const sections = [];
      const myStyle = {
        color: "",
        weight: 3,
        dashArray: "",
      };
      const circleMarker = {
        color: myStyle.color,
        fill: true,
        fillOpacity: 0.8,
        fillColor: "white",
        weight: 1,
        radius: 7,
      };
      routeTab.forEach((element) => {
        sections.push(element.sections);
      });
      sections.forEach((element1) => {
        element1.forEach((element2) => {
          myStyle.color =
            element2.type === "public_transport"
              ? "#" + element2.display_informations.color
              : "#000";
          myStyle.dashArray =
            element2.type === "street_network" || element2.type === "transfer"
              ? "5,10"
              : "";
          if (element2.geojson != null) {
            leaflet
              .geoJSON(element2.geojson, {
                style: myStyle,
                onEachFeature: function (feature, layer) {
                  if (element2.type === "public_transport") {
                    element2.stop_date_times.forEach((element3) => {
                      leaflet
                        .circleMarker(
                          [
                            element3.stop_point.coord.lat,
                            element3.stop_point.coord.lon,
                          ],
                          circleMarker,
                          (circleMarker.color = myStyle.color)
                        )
                        .bindPopup(element3.stop_point.name)
                        .addTo(map);
                    });
                  }
                  if (element2.display_informations != null) {
                    layer.bindPopup(
                      element2.display_informations.commercial_mode +
                        " : " +
                        element2.display_informations.label +
                        " > " +
                        element2.display_informations.direction +
                        " from " +
                        element2.from.name +
                        " to " +
                        element2.to.name
                    );
                  }
                },
              })
              .addTo(map);
          }
        });
      });
    },
    displayRoutesPage() {
      const routesJourneys = JSON.parse(localStorage.getItem("journeys"));
      routesJourneys.forEach((journey) => {
        if (journey.sections) {
          this.sections.push(journey.sections);
        }
      });
    },
    formatHour(dateTime) {
      const time = dateTime.split("T")[1];
      return time.substring(0, 2) + ":" + time.substring(2, 4);
    },
    addFavourite() {
      let favArray = JSON.parse(localStorage.getItem("favs"));
      const adressData = JSON.parse(localStorage.getItem("address_from_to"));
      const from = adressData.depart.geometry.coordinates;
      const to = adressData.destination.geometry.coordinates;
      favArray.push({
        from: from[0] + "%3B" + from[1],
        to: to[0] + "%3B" + to[1],
      });
      localStorage.setItem("favs", JSON.stringify(favArray));
      console.log(JSON.parse(localStorage.getItem("favs")));
    },
  },
  mounted: async function () {
    if (!JSON.parse(localStorage.getItem("favs"))) {
      console.log("?????");
      localStorage.setItem("favs", JSON.stringify([]));
    }
    console.log(JSON.parse(localStorage.getItem("favs")));
    const map = leaflet.map("map").setView([48.85341, 2.3488], 13);
    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map);
    const adressData = JSON.parse(localStorage.getItem("address_from_to"));
    console.log(adressData);
    const from = adressData.depart.geometry.coordinates;
    const to = adressData.destination.geometry.coordinates;
    leaflet.marker([from[1], from[0]]).bindPopup("Start").addTo(map);
    leaflet.marker([to[1], to[0]]).bindPopup("End").addTo(map);
    await this.callAPI(from, to);
    this.drawRoutes(map);
    this.displayRoutesPage();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
#map {
  height: 400px;
  width: 800px;
  margin-left: 70px;
}
.map_container {
  display: flex;
  justify-content: center;
}
table {
  width: 900px;
  margin-bottom: 15px;
  border: 1px solid rgb(34, 50, 128);
  border-collapse: collapse;
  color: black;
}
table thead tr {
  color: whitesmoke;
  background-color: rgb(34, 50, 128);
  font-size: 1rem;
}
table tbody tr {
  border: 1px solid lightgray;
  background-color: #ececec;
}
table th {
  letter-spacing: 0.075rem;
}
table th,
table td {
  padding: 5px;
  font-weight: normal;
  text-align: center;
}
.button {
  text-decoration: none;
  text-align: center;
  padding-top: 12px;
  margin-top: 10px;
  background-color: #fff;
  width: 200px;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(34, 50, 128) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: rgb(34, 50, 128);
  font-size: 15px;
  font-weight: 600;
  border-radius: 4px;
  outline-color: rgb(34 50 128 / 0.5);
  cursor: pointer;
  border: unset;
}
.button:hover {
  color: #fff;
  background-color: rgb(34, 50, 128);
  transition: background-color 0.5s linear;
}
</style>
