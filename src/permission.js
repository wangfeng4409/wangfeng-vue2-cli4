import router from "./router";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条style
import getPageTitle from "@/utils/get-page-title"; // 获取页面的title

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  const token = localStorage.getItem("token");
  console.log(token, "111");
  console.log(to, "222");
  next();
  //   if (token) {
  //     if (to.path === "/login") {
  //       // if is logged in, redirect to the home page
  //       next({ path: "/" });
  //       NProgress.done();
  //     } else {
  //       next();
  //       NProgress.done();
  //     }
  //   } else {
  //     next("/login");
  //     NProgress.done();
  //   }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
