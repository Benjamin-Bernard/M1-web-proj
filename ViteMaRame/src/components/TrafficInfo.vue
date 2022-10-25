<template>
  <h1>Infos Trafic</h1>
  <div class="formbg">
    <div class="homeBtns">
      <div id="1" class="button-square">
        <button style="background-color: #FFCC30" @click="getTraficInfo(incidentMessages[1])">1</button>
      </div>
      <div id="2" class="button-square">
        <button style="background-color: #006FB6" @click="getTraficInfo(incidentMessages[2])">2</button>
      </div>
      <div id="3" class="button-square">
        <button style="background-color: #9B9842" @click="getTraficInfo(incidentMessages[3])">3</button>
      </div>
      <div id="3B" class="button-square">
        <button style="background-color: #8AD3DE" @click="getTraficInfo(incidentMessages[15])">3bis</button>
      </div>
      <div id="4" class="button-square">
        <button style="background-color: #B94E9A" @click="getTraficInfo(incidentMessages[4])">4</button>
      </div>
    </div>
    <div class="homeBtns">
      <div id="5" class="button-square">
        <button style="background-color: #F58F53" @click="getTraficInfo(incidentMessages[5])">5</button>
      </div>
      <div id="6" class="button-square">
        <button style="background-color: #7AC597" @click="getTraficInfo(incidentMessages[6])">6</button>
      </div>
      <div id="7" class="button-square">
        <button style="background-color: #F49FB3" @click="getTraficInfo(incidentMessages[7])">7</button>
      </div>
      <div id="7B" class="button-square">
        <button style="background-color: #7AC597" @click="getTraficInfo(incidentMessages[16])">7bis</button>
      </div>
      <div id="8" class="button-square">
        <button style="background-color: #C4A4CC" @click="getTraficInfo(incidentMessages[8])">8</button>
      </div>
    </div>
    <div class="homeBtns">
      <div id="9" class="button-square">
        <button style="background-color: #CEC73D" @click="getTraficInfo(incidentMessages[9])">9</button>
      </div>
      <div id="10" class="button-square">
        <button style="background-color: #DFAF47" @click="getTraficInfo(incidentMessages[10])">10</button>
      </div>
      <div id="11" class="button-square">
        <button style="background-color: #8D653D" @click="getTraficInfo(incidentMessages[11])">11</button>
      </div>
      <div id="12" class="button-square">
        <button style="background-color: #008B5B" @click="getTraficInfo(incidentMessages[12])">12</button>
      </div>
      <div id="13" class="button-square">
        <button style="background-color: #8AD3DE" @click="getTraficInfo(incidentMessages[13])">13</button>
      </div>
    </div>
    <div class="homeBtns">
      <div id="14" class="button-square">
        <button style="background-color: #65318F" @click="getTraficInfo(incidentMessages[14])">14</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common.js";

export default {
  name: "TrafficInfo",
  data() {
    return {
      disruptions:[],
      lines:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","3B","4B"],
      incidentMessages:[]
    }
  },
  methods: {
    getTraficInfo(msg) {
      if(msg == null)
        alert("Aucun problème de trafic.")
      else
        alert(msg)
    },
    async callAPI() {
      await http.get('https://api.navitia.io/v1/coverage/fr-idf/disruptions?data_freshness=realtime&')
          .then((response) => {
            this.disruptions = response.data.disruptions;
          })
          .catch(err => console.log(err))
    },
    getIncidents() {
      this.disruptions.forEach((element1) => {
        if(element1.status == "active"){
          if(element1.category == "Incidents"){
            element1.impacted_objects.forEach((element2) => {
              if(element2.pt_object.embedded_type == "line"){
                if(element2.pt_object.line.commercial_mode.id == "commercial_mode:Metro"){
                  if(this.lines.includes(element2.pt_object.line.code)){
                    document.getElementById(element2.pt_object.line.code).setAttribute("style", "border-color:" + element1.severity.color);
                    if(element2.pt_object.line.code == "3B")
                      this.incidentMessages[15] = element1.messages[0].text;
                    if(element2.pt_object.line.code == "7B")
                      this.incidentMessages[16] = element1.messages[0].text;
                    else
                      this.incidentMessages[element2.pt_object.line.code] = element1.messages[0].text;
                  }
                }
              }
            })
          }
        }
      });
    }
  },
  mounted: 
    async function(){
      await this.callAPI();
      this.getIncidents()
    }
  
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 50px;
}

.formbg {
  margin: 10px auto;
  width: 100%;
  max-width: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
  rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  flex-direction: column;
}

.homeBtns {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.button-square {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 5px solid;
  border-color: #2eb759;
  background-color: rgb(204, 203, 203);
  height: 200px;
  width: 200px;
  color: #fff;
  margin-left: 5px;
  margin-right: 5px;
}

.button-square:hover {
  color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  transition: background-color 0.5s linear;
}

button {
  margin-top: 10px;
  background-color: #fff;
  width: 170px;
  height: 170px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: rgb(0, 0, 0);
  font-size: 75px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 100px;
  outline-color: rgba(255, 255, 255);
  cursor: pointer;
  border: unset;
}

button:hover {
  color: #fff;
  background-color: rgb(34, 50, 128);
  transition: background-color 0.5s linear;
}
</style>
  