<template>
    <div>
        <h1>Calculer mon itinéraire</h1>
        <div class="form">
            <form>
                <p id="inavalid-data-msg" v-if="invalidData">Le mot de passe doit être composée d'au moins 8 caractères</p>
                <input class="wide-input" type="text" placeholder="Choisissez un point de départ" v-model="form.depart" required>
                <input class="wide-input" type="text" placeholder="Choisissez une destination" v-model="form.destination" required>
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
                    <button @click="searchAdresses">Calculer</button>
                </div>
                <p>{{ form.depart }}</p>
            </form>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
        invalidData: false,
        leaveNow: true,
        form: {
            depart: "",
            destination: "",
            time: "",
        }
    }
  },
  methods: {
    getTime() {
        this.leaveNow = (this.form.time === "leaveNow")
    }, 
    // C'est juste un test xD
    checkData() {
        if (this.form.depart === "marseille") {
            return true
        }
        else {
            return false
        }
    }
   
    },
    computed: {
      searchAdresses() {
      const URL = "https://api-adresse.data.gouv.fr/search/?q="
      fetch(URL + this.form.depart + "&limit=5")
        .then((res) => res.json())
        .then((data) => {
          const adresses = []
          for (let i = 0; i < data.features.length; i++) {
              const adress = {
                  name: data.features[i].properties.name,
                  postcode: data.features[i].properties.postcode,
                  city: data.features[i].properties.city,
                  coordinates: {
                      lon: data.features[i].geometry.coordinates[0],
                      lat: data.features[i].geometry.coordinates[1]
                  }
              }
              adresses.push(adress) 
              console.log(adresses)  
              return adresses 
          }
        })

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
</style>