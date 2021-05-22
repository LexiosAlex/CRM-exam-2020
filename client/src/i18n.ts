import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './media/locales/ru.json';
import en from './media/locales/en.json';
import { Language } from 'common/constants';

const options: InitOptions = {
  defaultNS: 'translation',
  fallbackLng: ['ru', 'en'],
  load: 'languageOnly',
  resources: { ...en, ...ru },
  saveMissing: true,
  lng: Language.RU,
  interpolation: {
    //TODO: looks like there is no react support
    escapeValue: false,
    format: (value, format) => {
      if (format === 'uppercase') {
        return value.toUpperCase();
      }
      return value;
    },
    formatSeparator: ',',
  },
};

i18next.use(initReactI18next).init(options);

export default i18next;
