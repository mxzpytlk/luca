import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { IAuthData } from '@/core/interfaces/auth-data.interface';
import { setInLocalStorage } from '@/core/utills/local-storage.utills';

export default {
  state: {
    token: localStorage.getItem(LocalStorageKey.TOKEN),
  },
  mutations: {
    auth_success(state: any, auth: { token: string }) {
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
    isLoggedIn: (state: any) => !!state.token,
    authStatus: (state: any) => state.status,
  },
  actions: {
    async login({ commit }: any, loginData: IAuthData) {
    // TODO Make login by connection with server
      const { name, pass } = loginData;
      let token;
      if (!name || !pass) {
        throw new Error('Name and password can\'t be empty');
      }

      if (name === 'z1' && pass === '1') {
        token = 'TODO';
        setInLocalStorage(LocalStorageKey.TOKEN, token);
        commit('auth_success', { token: 'TODO' });
      } else {
        throw new Error('Login or password is incorrect');
      }
    },
    async register({ }, registerData: IAuthData) {
      const { name, pass } = registerData;
      if (!name || !pass) {
        throw new Error('Name and password can\'t be empty');
      }
      // TODO
    },
  },
};
