import Vue from "vue";
import VueRouter from "vue-router";
import PageHome from "@/views/PageHome.vue";
import PageThreadShow from "@/views/PageThreadShow";
import PageNotFound from "@/views/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    props: true,
    component: PageThreadShow
  },
  {
    path: "*",
    name: "NotFound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
