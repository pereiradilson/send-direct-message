import { Platform } from 'react-native';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import pt from './pt.json';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async (callback: any) => {
    const storedLanguage = await AsyncStorage.getItem('language');
    if (storedLanguage) {
      return callback(storedLanguage);
    }

    let phoneLanguage = null;
    if (Platform.OS === 'android') {
      phoneLanguage = Localization.locale;
    } else {
      phoneLanguage = Localization.locale;
    }

    phoneLanguage = phoneLanguage.replace('_', '-');

    return callback(phoneLanguage);
  },
  cacheUserLanguage: (language: any) => {
    AsyncStorage.setItem('language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: false,
    debug: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });

export default i18n;
