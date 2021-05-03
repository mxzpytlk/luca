import { LocalStorageKey } from '@/core/enums/local-storage-key';
import { setInLocalStorage } from '@/core/utills/local-storage.utills';

export default {
  state: {
    locale: localStorage.getItem(LocalStorageKey.LOCALE)?.slice(1, 3) || 'en',
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
      setInLocalStorage(LocalStorageKey.LOCALE, newLocale);
      commit('updateLocale', newLocale);
    },
  },
};
