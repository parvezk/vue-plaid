<template>
  <div id="app">
    <app-header></app-header>
    <app-item-list></app-item-list>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ItemList from "./components/ItemList.vue";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appItemList: ItemList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fff;
  color: #174f7c;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.5;
}

#app {
  max-width: 1050px;
  margin: 0 auto;
  padding: 140px 40px;
}
</style>
