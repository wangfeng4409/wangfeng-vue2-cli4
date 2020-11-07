import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/Layout.vue";

const Home = () => import("@/views/Home.vue");
const News = () => import("@/views/News.vue");
const About = () => import("@/views/About.vue");
const Three = () => import("@/views/Three.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/admin"
  },
  {
    path: "/admin",
    component: Layout,
    children: [
      {
        path: "",
        redirect: "home"
      },
      {
        path: "home",
        name: "Home",
        component: Home
      },
      {
        path: "news",
        name: "News",
        component: News
      }
    ]
  },
  {
    path: "/second",
    component: Layout,
    children: [
      {
        path: "about",
        name: "About",
        component: About
      }
    ]
  },
  {
    path: "/three",
    component: Layout,
    children: [
      {
        path: "",
        name: "Three",
        component: Three
      }
    ]
  }
];
// BASE_URL取决于vue.config.js中的publicPath
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
