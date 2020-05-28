import Vue from "vue";
import VueRouter from "vue-router";
import PageHome from "@/views/PageHome.vue";
import PageThreadShow from "@/views/PageThreadShow";
import PageThreadCreate from "@/views/PageThreadCreate";
import PageThreadEdit from "@/views/PageThreadEdit";
import PageNotFound from "@/views/PageNotFound";
import PageForum from "@/views/PageForum";
import PageRegister from "@/views/PageRegister";
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
    path: "/register",
    name: "Register",
    props: true,
    component: PageRegister
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
    path: "/user/edit",
    name: "ProfileEdit",
    props: { edit: true },
    component: PageProfile
  },
  {
    path: "/category/:id",
    name: "Category",
    props: true,
    component: PageCategory
  },
  {
    path: "/thread/create/:forumId",
    name: "ThreadCreate",
    props: true,
    component: PageThreadCreate
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    props: true,
    component: PageThreadShow
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    props: true,
    component: PageThreadEdit
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
