<template>
  <div id="app">
    <app-navbar />
    <div class="container">
      <router-view v-show="showPage" @ready="showPage = true" />
      <app-spinner v-show="!showPage" />
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import AppNavbar from "@/components/TheNavbar";
import AppSpinner from "@/components/AppSpinner";

export default {
  components: { AppNavbar, AppSpinner },
  data() {
    return {
      showPage: false
    };
  },
  methods: {
    pageReady() {
      this.showPage = true;
      NProgress.done();
      NProgress.remove();
    }
  },
  created() {
    NProgress.configure({
      showSpinner: false
    });
    NProgress.start();
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false;
      NProgress.start();
      next();
    });
  }
};
</script>

<style>
@import "assets/css/style.css";
@import "~nprogress/nprogress.css";

#nprogress .bar {
  background: #57ad8d;
}
</style>
