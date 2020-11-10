import router from "./router";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条style
import getPageTitle from "@/utils/get-page-title"; // 获取页面的title

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  const hasToken = localStorage.getItem("token");

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
