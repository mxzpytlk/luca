import { ApiHref } from '@/core/enums/api.enum';
import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { post } from '@/core/utills/api.utills';

export default {
  state: {
    locale: localStorage.getItem(LocalStorageKey.LOCALE) || 'en',
  },

  mutations: {
    updateLocale(state: any, locale: string) {
      state.locale = locale;
    },
  },

  getters: {
    locale: (state: any) => state.locale,
  },

  actions: {
    setLocale({ commit }: any, newLocale: string) {
      localStorage.setItem(LocalStorageKey.LOCALE, newLocale);
      commit('updateLocale', newLocale);
    },

    async changePass({ }: any, data: { oldPass: string, newPass: string }) {
      const { oldPass, newPass } = data;
      await post(ApiHref.CHANGE_PASS, {
        newPass, oldPass,
      });
    },
  },
};
