import { LocalStorageKey } from '@/core/enums/local-storage-key';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem(LocalStorageKey.TOKEN),
  },
  mutations: {
    auth_success(state: any, auth) {
      state.status = 'success';
      state.token = auth.token;
    },
    auth_error(state: any) {
      state.status = 'error';
    },
    logout(state: any) {
      state.status = '';
      state.token = '';
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  actions: {
    login({commit}, loginData) {
      // TODO Make login by connection with server
      return new Promise((resolve) => {
        const { name, pass } = loginData;
        let token;
        if (name === 'z1' && pass === '1') {
          token = 'TODO';
          localStorage.setItem(LocalStorageKey.TOKEN, token);
        }
        commit('auth_success', {token: 'TODO'});
        resolve(null);
      });
    },
    register({commit}, registerData) {
      return new Promise((resolve) => {
        // TODO
        resolve(null);
      });
    },
  },
  modules: {
  },
});
