import Vue from 'vue';
import Vuex from 'vuex';
import sector from './modules/sector';
import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: { sector, auth, user },
});
