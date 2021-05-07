import Vue from 'vue';
import Vuex from 'vuex';
import recordsFilter from './modules/records-filter';
import user from './modules/user';
import auth from './modules/auth';

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
  modules: { recordsFilter, user, auth },
});
