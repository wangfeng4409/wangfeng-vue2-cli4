import { getToken, setToken, removeToken } from "@/utils/auth";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: ""
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
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
