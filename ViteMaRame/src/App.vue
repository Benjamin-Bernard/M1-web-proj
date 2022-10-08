<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
 <!-- <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
  </header>-->
  <RouterLink to="/"><div class="test"><font-awesome-icon :icon="['fas', 'home']" size="2x"/></div></RouterLink>
  <RouterView />
</template>

<style>
/*header {
  line-height: 1.5;
  max-height: 100vh;
}



nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/

.test{
  color:rgb(34, 50, 128);
  margin-top: 5px;
  margin-left:5px;
}

</style>
