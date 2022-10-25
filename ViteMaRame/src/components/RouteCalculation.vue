<template>
  <div class="route-calculation" @click="closeSuggestions">
    <h1>Calculer mon itinéraire</h1>
    <div class="form">
      <form>
        <p id="inavalid-data-msg" v-if="invalidData">Le mot de passe doit être composée d'au moins 8 caractères</p>
        <input
            class="wide-input"
            type="text"
            placeholder="Choisissez un point de départ"
            v-model="form.depart" @keyup="fetchsuggestions(form.depart)"
            @click="openSuggestionsDepart=true"
            required>
        <div class="suggestions" v-if="form.depart.length>0 && openSuggestionsDepart">
          <ul>
            <li v-for="adress in suggestions" :key="adress.adress_line1" @click="selectDepart(adress)">
              {{ adress.properties.formatted }}
            </li>
          </ul>
        </div>
        <input
            class="wide-input"
            type="text" placeholder="Choisissez une destination"
            v-model="form.destination" @keyup="fetchsuggestions(form.destination)"
            @click="openSuggestionsDestiantion=true"
            required>
        <div class="suggestions" v-if="form.destination.length>0 && openSuggestionsDestiantion">
          <ul>
            <li v-for="adress in suggestions" :key="adress.adress_line1" @click="selectDestination(adress)">
              {{ adress.properties.formatted }}
            </li>
          </ul>
        </div>
        <p>Options</p>
        <select class="medium-input" name="time" id="time" v-model="form.time" :change="getTime()">
          <option value="leaveNow">Partir maintenant</option>
          <option value="departAt">Départ à</option>
          <option value="arriveAt">Arrivée à</option>
        </select>
        <input class="small-input" type="time" v-if="!leaveNow" required>
        <select class="medium-input" name="transport" id="transport">
          <option value="all">Tout transport</option>
          <option value="metro">Métro</option>
          <option value="bus">Bus</option>
          <option value="RER">RER</option>
          <option value="tramway">Tramway</option>
        </select>
        <div class="btn-container">
          <button @click="storeAdresses" type="button">Calculer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "RouteCalculation",
  data() {
    return {
      openSuggestionsDepart: true,
      openSuggestionsDestiantion: true,
      suggestions: [],
      invalidData: false,
      leaveNow: true,
      form: {
        depart: "",
        destination: "",
        time: "",
      },
      adresses: { //adresses.depart.properties.geometry
        depart: {},
        destination: {}
      }

    }
  },
  methods: {
    getTime() {
      this.leaveNow = (this.form.time === "leaveNow")
    },
   fetchsuggestions(adress) {

      const url = "https://api.geoapify.com/v1/geocode/autocomplete?text="
      setTimeout(async () => {
        if (this.form.depart.length != 0) {
          var requestOptions = {
            method: 'GET',
          };

          await fetch(url + adress + "&lang=fr&limit=3&filter=countrycode:fr&apiKey=84f66adf152446288ac50036427af219", requestOptions)
              .then(res => res.json())
              .then(data => this.suggestions = data.features)
              .catch(error => console.log('error', error));
        }
      }, 100)

    },
    selectDepart(adress) {
      this.openSuggestionsDepart = false
      this.form.depart = adress.properties.formatted
      this.adresses.depart = adress
      this.suggestions.length = 0
    },
    selectDestination(adress) {
      this.openSuggestionsDestiantion = false
      this.form.destination = adress.properties.formatted
      this.adresses.destination = adress
      this.suggestions.length = 0
    },
    closeSuggestions() {

    },
    storeAdresses() {
      //this.$emit('sendAdresses', this.adresses)
      localStorage.setItem(localStorage.length+1, JSON.stringify(this.adresses));
      this.$router.push("/MapRoute");

    }
  }

}
</script>

<style scoped>

h1 {
  text-align: center;
  margin-bottom: 64px;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: auto;
  width: 400px;
  height: 350px;
  padding: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
  rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
}

.wide-input {
  width: 100%;
  height: 48px;
  border: none;
  border: 1px solid rgba(60, 66, 87, 0.12);
  background-color: rgb(251, 251, 251);
  border-radius: 4px;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 16px;
}

.medium-input {
  width: 60%;
  height: 40px;
  border: none;
  border-bottom: 1px solid grey;
  font-size: 16px;
  margin: 2px;
}

.small-input {
  width: 35%;
  height: 40px;
  border: none;
  border-bottom: 1px solid grey;
  font-size: 16px;
  margin: 2px;
}

.btn-container {
  display: flex;
  width: 80%;
  margin: 10px auto;
  padding: 5px;
  justify-content: center;
}

button {
  width: 50px;
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

button:hover {
  color: #fff;
  background-color: rgb(34, 50, 128);
  transition: background-color 0.5s linear;
}

ul {
  list-style-type: none;
  padding: 3%;
  border-radius: 4px;
  height: 100%;
  background-color: rgb(34, 50, 128);
}

li:hover {
  cursor: pointer;
  background-color: white;
  color: rgb(34, 50, 128);
  transition: background-color 0.5s linear;
}

li {
  color: white;
  border-bottom: 1px solid white;

  width: 99%;
  border-radius: 4px;
  margin: 1px;
  height: 50px;
  padding: 4px;
}

.suggestions {
  position: absolute;
  width: 100%;
  height: 56%;
  z-index: 100;
  border-radius: 4px;
}


</style>