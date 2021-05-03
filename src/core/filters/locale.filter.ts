import store from '../../store';
import ru from '@/assets/ru.json';
import en from '@/assets/en.json';


const locales: any = {
  ru, en,
};

export function localeFilter(key: string) {
  const locale = store.getters.locale;
  return locales[locale][key] || key;
}
