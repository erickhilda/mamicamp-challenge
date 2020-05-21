<template>
  <div id="app">
    <app-navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/TheNavbar";

export default {
  components: { AppNavbar }
};
</script>

<style>
@import "assets/css/style.css";
</style>
