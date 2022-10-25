<template>
  <h1>Mes itinéraires</h1>
  <ul
    v-for="(favourite, index) in this.getFavArray()"
    :key="favourite"
    class="favouritesContainer"
  >
    <li
      v-for="journey in this.getJourneys(favourite.from, favourite.to, index)"
      :key="journey"
      class="journeysContainer"
    >
      Date de départ: {{ this.formatHour(journey.departure_date_time) }} Durée
      du voyage:
      {{ this.secondsToMinutesAndSeconds(journey.durations.total) }}
      <div :style="{ display: 'flex', flexDirection: 'row' }">
        <div class="transportSection">{{ journey.sections[0].to.name }}</div>
        <span
          v-for="section in this.isPublicTransportSection(journey.sections)"
          :key="section"
          ><div class="transportSection">
            -->
            <div
              class="transportIcon"
              :style="{
                backgroundColor: '#' + section.display_informations.color,
              }"
            >
              {{ section.display_informations.code }}
            </div>
            <div>
              <div>{{ section.to.name }}</div>
              <div>Direction: {{ section.display_informations.direction }}</div>
            </div>
          </div></span
        >
      </div>

      {{ journey.status }}
    </li>
    <div :style="{ display: 'flex', flexDirection: 'row' }">
      <button @click="storeAdresses(index)" type="button" class="button">
        Voir itinéraire
      </button>
      <button @click="deleteFavourite(index)" type="button" class="button">
        Supprimer l'itinéraire
      </button>
    </div>
  </ul>
</template>

<script>
import http from "../http-common";

export default {
  name: "MyRoutes",
  data() {
    return {
      adresses: {
        depart: {
          geometry: {
            coordinates: [],
          },
        },
        destination: {
          geometry: {
            coordinates: [],
          },
        },
      },
    };
  },
  methods: {
    getJourneys(from, to, index) {
      const url = "api.navitia.io/v1/coverage/fr-idf/journeys?from=";
      setTimeout(async () => {
        await http
          .get("https://" + url + from + "&to=" + to + "&count=3&")
          .then((res) => {
            console.log(res.data.journeys);
            localStorage.setItem(
              "journeys" + index,
              JSON.stringify(res.data.journeys)
            );
          })
          .catch((error) => console.log("error", error));
      }, 100);
      return JSON.parse(localStorage.getItem("journeys" + index));
    },
    getFavArray() {
      console.log(JSON.parse(localStorage.getItem("favs")));
      return JSON.parse(localStorage.getItem("favs"));
    },
    secondsToMinutesAndSeconds(seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
      return minutes + " min " + remainingSeconds + " s";
    },
    formatHour(navitiaDate) {
      return navitiaDate.substr(9).match(/.{2}/g).join(":");
    },
    isPublicTransportSection(sections) {
      let publicTransportSection = new Array();
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].type == "public_transport") {
          publicTransportSection.push(sections[i]);
        }
      }
      return publicTransportSection;
    },
    storeAdresses(index) {
      const fromArray = JSON.parse(localStorage.getItem("favs"))[
        index
      ].from.split("%3B");
      const toArray = JSON.parse(localStorage.getItem("favs"))[index].to.split(
        "%3B"
      );
      this.adresses.depart.geometry.coordinates.push(fromArray[0]);
      this.adresses.depart.geometry.coordinates.push(fromArray[1]);
      this.adresses.destination.geometry.coordinates.push(toArray[0]);
      this.adresses.destination.geometry.coordinates.push(toArray[1]);
      localStorage.setItem("address_from_to", JSON.stringify(this.adresses));
      this.$router.push("/MapRoute");
    },
    deleteFavourite(index) {
      let favArray = JSON.parse(localStorage.getItem("favs"));
      favArray.splice(index, 1);
      localStorage.setItem("favs", JSON.stringify(favArray));
      this.$forceUpdate();
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.button {
  text-decoration: none;
  text-align: center;
  padding-top: 12px;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
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

.journeysContainer {
  text-align: center;
  margin: 10px auto;
  min-width: 80%;
  max-width: 100%;
  background: whitesmoke;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favouritesContainer {
  text-align: center;
  margin: 10px auto;
  max-width: 80%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transportIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: black;
  height: 50px;
  width: 50px;
  margin-left: 5px;
  margin-right: 5px;
}

.transportSection {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
