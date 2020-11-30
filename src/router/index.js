import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/Layout.vue";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  {
    path: "",
    redirect: "/first"
  },
  {
    path: "/first",
    component: Layout,
    meta: { title: "一级菜单" },
    children: [
      {
        path: "",
        redirect: "home"
      },
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/first/Home.vue"),
        meta: { title: "home" }
      },
      {
        path: "news",
        name: "News",
        component: () => import("@/views/first/News.vue"),
        meta: { title: "news" },
        children: [
          {
            path: "room",
            name: "Room",
            component: () => import("@/views/first/Room.vue"),
            meta: { title: "room" }
          }
        ]
      }
    ]
  },
  {
    path: "/second",
    component: Layout,
    meta: { title: "二级菜单" },
    children: [
      {
        path: "about",
        name: "About",
        component: () => import("@/views/second/About.vue"),
        meta: { title: "about" }
      }
    ]
  }
  // {
  //   path: "/three",
  //   component: Layout,
  //   meta: { title: "三级菜单" },
  //   children: [
  //     {
  //       path: "",
  //       name: "Three",
  //       component: () => import("@/views/third/Three.vue")
  //     }
  //   ]
  // }
];
// BASE_URL取决于vue.config.js中的publicPath
const createRouter = () =>
  new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    // 解决vue框架页面跳转有白色不可追踪色块的bug
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
