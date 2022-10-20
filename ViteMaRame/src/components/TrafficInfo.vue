<template>
  <h1>Infos Trafic</h1>
  <div class="formbg">
    <div class="homeBtns">
      <div class="button-square">
        <button id="m1" style="background-color: #FFCC30" @click="getTraficInfo()">1</button>
      </div>
      <div class="button-square">
        <button id="m2" style="background-color: #006FB6" @click="getTraficInfo()">2</button>
      </div>
      <div class="button-square">
        <button id="m3" style="background-color: #9B9842" @click="getTraficInfo()">3</button>
      </div>
      <div class="button-square">
        <button id="m3b" style="background-color: #8AD3DE" @click="getTraficInfo()">3bis</button>
      </div>
      <div class="button-square">
        <button id="m4" style="background-color: #B94E9A" @click="getTraficInfo()">4</button>
      </div>
    </div>
    <div class="homeBtns">
      <div class="button-square">
        <button id="m5" style="background-color: #F58F53" @click="getTraficInfo()">5</button>
      </div>
      <div class="button-square">
        <button id="m6" style="background-color: #7AC597" @click="getTraficInfo()">6</button>
      </div>
      <div class="button-square">
        <button id="m7" style="background-color: #F49FB3" @click="getTraficInfo()">7</button>
      </div>
      <div class="button-square">
        <button id="m7b" style="background-color: #7AC597" @click="getTraficInfo()">7bis</button>
      </div>
      <div class="button-square">
        <button id="m8" style="background-color: #C4A4CC" @click="getTraficInfo()">8</button>
      </div>
    </div>
    <div class="homeBtns">
      <div class="button-square">
        <button id="m9" style="background-color: #CEC73D" @click="getTraficInfo()">9</button>
      </div>
      <div class="button-square">
        <button id="m10" style="background-color: #DFAF47" @click="getTraficInfo()">10</button>
      </div>
      <div class="button-square">
        <button id="m11" style="background-color: #8D653D" @click="getTraficInfo()">11</button>
      </div>
      <div class="button-square">
        <button id="m12" style="background-color: #008B5B" @click="getTraficInfo()">12</button>
      </div>
      <div class="button-square">
        <button id="m13" style="background-color: #8AD3DE" @click="getTraficInfo()">13</button>
      </div>
    </div>
    <div class="homeBtns">
      <div class="button-square">
        <button id="m14" style="background-color: #65318F" @click="getTraficInfo()">14</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrafficInfo",
  methods: {
    getTraficInfo() {
      alert("trafic msg ici si pb trafic sur ligne")
    },
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
  border: 5px solid rgb(46, 183, 89);
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
  