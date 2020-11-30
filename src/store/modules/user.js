import { getToken, setToken, removeToken } from "@/utils/auth";
import { constantRoutes } from "@/router";
import Layout from "@/layout/Layout.vue";
const Three = () => import("@/views/third/Three.vue");

const getDefaultState = () => {
  return {
    token: getToken(),
    addRoutes: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROUTES: (state, route) => {
    state.addRoutes = route;
    state.routes = constantRoutes.concat(route);
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    if ("admin" === username.trim() && "111111" === password) {
      commit("SET_TOKEN", "wangfeng");
      setToken("wangfeng");
    }
  },
  // user logout
  logout({ commit }) {
    removeToken(); // must remove  token  first
    commit("RESET_STATE");
  },
  // 获取用户的动态路由
  getMenuByUser({ commit }) {
    let accessedRoutes = [
      {
        path: "/three",
        component: Layout,
        meta: { title: "三级菜单" },
        children: [
          {
            path: "",
            name: "Three",
            component: Three
          }
        ]
      }
    ];
    return new Promise(resolve => {
      commit("SET_ROUTES", accessedRoutes);
      let a = constantRoutes.concat(accessedRoutes);
      resolve(a);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
