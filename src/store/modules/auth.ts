import { ApiHref } from '@/core/enums/api.enum';
import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { RouterPath } from '@/core/enums/router-path';
import { IAuthData } from '@/core/interfaces/auth-data.interface';
import { post } from '@/core/utills/api.utills';
import router from '@/router';
import axios from 'axios';

export default {
  state: {
    token: localStorage.getItem(LocalStorageKey.TOKEN),
    name: localStorage.getItem(LocalStorageKey.NAME),
    userId: localStorage.getItem(LocalStorageKey.USER_ID),
  },
  mutations: {

    auth_success(state: any, auth: { token: string, name: string, id: string }) {
      state.token = auth.token;
      state.name = auth.name;
      state.userId = auth.id;
    },


    logout(state: any) {
      state.token = '';
      state.name = '';
    },

  },

  getters: {
    isLoggedIn: (state: any) => !!state.token,
    name: (state: any) => state.name,
    userId: (state: any) => state.id,
  },

  actions: {

    async login({ commit }: any, loginData: IAuthData) {
      const { name, pass } = loginData;
      if (!name || !pass) {
        throw new Error('Name and password can\'t be empty');
      }

      const res = await post(ApiHref.LOGIN, loginData);

      const { token, id } = res?.data;
      if (token && id) {
        localStorage.setItem(LocalStorageKey.TOKEN, token);
        localStorage.setItem(LocalStorageKey.NAME, name);
        localStorage.setItem(LocalStorageKey.USER_ID, id);
        axios.defaults.headers.common.Authorization = token;
        commit('auth_success', { token, name, id });
      } else {
        throw new Error('Login or password is incorrect');
      }
    },


    async register({ }, registerData: IAuthData) {
      const { name, pass } = registerData;
      if (!name || !pass) {
        throw new Error('Name and password can\'t be empty');
      }
      await post(ApiHref.REGISTER, { name, pass });
    },


    async logout({ commit }: any) {
      localStorage.removeItem(LocalStorageKey.TOKEN);
      localStorage.removeItem(LocalStorageKey.NAME);
      delete axios.defaults.headers.common.Authorization;
      commit('logout');
      await router.push(RouterPath.AUTH);
    },
  },
};
