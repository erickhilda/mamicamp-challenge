import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import ThreadShow from "@/views/ThreadShow";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    props: true,
    component: ThreadShow
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
