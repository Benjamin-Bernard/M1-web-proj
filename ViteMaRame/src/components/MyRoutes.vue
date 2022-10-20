<template>
  <h1>Mes itinéraires</h1>
  <div>
    <li
        v-for="itineraire in itineraires"
        :key="itineraire.name"
        class="listContainer"
    >
      {{ itineraire.name }}
      <router-link to="/" class="button">Voir itinéraire</router-link>
    </li>
  </div>
</template>

<script>
export default {
  name: "MyRoutes",
  data() {
    //On utilisera le local storage
    return {
      itineraires: [{name: "Itinéraire 1"}, {name: "Itinéraire 2"}],
    };
  },
  methods: {}
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

.listContainer {
  text-align: center;
  margin: 10px auto;
  max-width: 50%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
  rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
