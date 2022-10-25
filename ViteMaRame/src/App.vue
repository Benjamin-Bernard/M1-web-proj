<script setup>
import {RouterLink, RouterView} from "vue-router";
</script>

<template>
  <routerLink to="/">
    <div class="test">
      <font-awesome-icon :icon="['fas', 'home']" size="2x"/>
    </div>
  </routerLink>
  <routerView/>
</template>

<style>

.test {
  color: rgb(34, 50, 128);
  margin-top: 5px;
  margin-left: 5px;
}

</style>
