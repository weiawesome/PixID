import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 初始化时如果没有设置语言，默认使用繁体中文
const getInitialLanguage = (): string => {
  const stored = localStorage.getItem('i18nextLng');
  if (stored && ['zh_cn', 'zh_tw', 'en', 'ja', 'ko'].includes(stored)) {
    return stored;
  }
  // 设置默认语言为 zh_tw
  localStorage.setItem('i18nextLng', 'zh_tw');
  return 'zh_tw';
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh_tw',
    lng: getInitialLanguage(),
    supportedLngs: ['zh_cn', 'zh_tw', 'en', 'ja', 'ko'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/PixID/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      convertDetectedLanguage: (lng: string) => {
        // 将浏览器检测到的 zh 映射到 zh_tw
        if (lng.startsWith('zh')) {
          // 如果检测到 zh-CN 或 zh-Hans，使用 zh_cn
          if (lng.includes('CN') || lng.includes('Hans') || lng === 'zh-CN') {
            return 'zh_cn';
          }
          // 其他情况使用 zh_tw
          return 'zh_tw';
        }
        return lng;
      },
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    // 确保语言正确设置
    const currentLang = i18n.language;
    if (!currentLang || !['zh_cn', 'zh_tw', 'en', 'ja', 'ko'].includes(currentLang)) {
      i18n.changeLanguage('zh_tw');
    }
  });

export default i18n;
