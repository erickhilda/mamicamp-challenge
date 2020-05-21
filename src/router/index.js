import Vue from "vue";
import VueRouter from "vue-router";
import PageHome from "@/views/PageHome.vue";
import PageThreadShow from "@/views/PageThreadShow";
import PageNotFound from "@/views/PageNotFound";
import PageForum from "@/views/PageForum";
import PageCategory from "@/views/PageCategory";
import PageProfile from "@/views/PageProfile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome
  },
  {
    path: "/forum/:id",
    name: "Forum",
    props: true,
    component: PageForum
  },
  {
    path: "/user",
    name: "Profile",
    props: true,
    component: PageProfile
  },
  {
    path: "/category/:id",
    name: "Category",
    props: true,
    component: PageCategory
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
