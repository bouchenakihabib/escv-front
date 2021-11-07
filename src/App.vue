<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">ESCV</router-link>
      <div class="navbar-nav mr-auto">
        <ul>
        <li class="nav-item">
          <router-link to="/mes-cvs" class="nav-link">CV'S</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/upload-cv" class="nav-link">Add</router-link>
        </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
ul > li {
    display: inline-block;
    zoom:1;
    *display:inline;
}
</style>
<script>
export default {
  name: "app"
};
</script>