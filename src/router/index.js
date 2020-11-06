import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/Home.vue");
const About = () => import("@/views/About.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];
console.log(process.env, "ppp");
// BASE_URL取决于vue.config.js中的publicPath
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
