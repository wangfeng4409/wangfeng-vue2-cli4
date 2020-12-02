import router, { resetRouter } from "./router";
import store from "./store";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title"; // 获取页面的title

router.beforeEach(async (to, from, next) => {
  console.log(to, "to.path");
  // start progress bar
  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasAddRoutes =
        store.getters.addRoutes && store.getters.addRoutes.length > 0;
      if (hasAddRoutes) {
        next();
      } else {
        try {
          const accessRoutes = await store.dispatch("user/getMenuByUser");
          resetRouter();
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/logout");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
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
