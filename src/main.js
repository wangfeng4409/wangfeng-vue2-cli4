import Vue from "vue";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/permission"; // permission control

Vue.config.productionTip = false;

Vue.use(Element);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
