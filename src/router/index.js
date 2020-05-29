import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import PageHome from "@/views/PageHome.vue";
import PageThreadShow from "@/views/PageThreadShow";
import PageThreadCreate from "@/views/PageThreadCreate";
import PageThreadEdit from "@/views/PageThreadEdit";
import PageNotFound from "@/views/PageNotFound";
import PageForum from "@/views/PageForum";
import PageRegister from "@/views/PageRegister";
import PageSignIn from "@/views/PageSignIn";
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
    component: PageRegister,
    meta: { requiresGuest: true }
  },
  {
    path: "/signin",
    name: "Signin",
    props: true,
    component: PageSignIn,
    meta: { requiresGuest: true }
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
    component: PageProfile,
    beforeRouteEnter(to, from, next) {
      if (store.state.authId) {
        next();
      } else {
        next({ name: "Home" });
      }
    }
  },
  {
    path: "/user/edit",
    name: "ProfileEdit",
    props: { edit: true },
    component: PageProfile,
    meta: { requiresAuth: true }
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
    component: PageThreadCreate,
    meta: { requiresAuth: true }
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
    component: PageThreadEdit,
    meta: { requiresAuth: true }
  },
  {
    path: "/logout",
    name: "SignOut",
    beforeEnter(to, from, next) {
      store.dispatch("signOut").then(() => next({ name: "Home" }));
    },
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  console.log(`🚦 navigating to ${to.name} from ${from.name}`);
  store.dispatch("initAuthentication").then(user => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      // protected route
      if (user) {
        next();
      } else {
        next({ name: "Signin" });
      }
    } else if (to.matched.some(route => route.meta.requiresGuest)) {
      // protected route
      if (!user) {
        next();
      } else {
        next({ name: "Home" });
      }
    } else {
      next();
    }
  });
});

export default router;
