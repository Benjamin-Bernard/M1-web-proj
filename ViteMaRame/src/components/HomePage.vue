<template>
  <div class="homeContainer">
    <h1>Vite Ma Rame</h1>
    <div class="formbg">
      <div class="homeBtns">
        <div class="icon-btns">
          <font-awesome-icon :icon="['fas', 'train']" size="3x"/>
          <router-link to="/RouteCalculation" class="button">
            Calculer un itinéraire
          </router-link>
        </div>
        <div class="icon-btns">
          <font-awesome-icon :icon="['fas', 'traffic-light']" size="3x"/>
          <router-link to="/MyRoutes" class="button">Mes itinéraires</router-link>
        </div>
        <div class="icon-btns">
          <font-awesome-icon :icon="['fas', 'phone']" size="3x"/>
          <router-link to="/TrafficInfo" class="button">Infos Trafic</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {}
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
  max-width: 90%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
  rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  flex-direction: column;
}

.homeBtns {
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  margin-bottom: 80px;
}

.icon-btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid rgb(34, 50, 128);
  background-color: rgb(34, 50, 128);
  height: 200px;
  width: 300px;
  color: #fff;
}

.icon-btns:hover {
  color: rgb(34, 50, 128);
  background-color: #fff;
  transition: background-color 0.5s linear;
}

/*rgb(84, 105, 212)*/
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
