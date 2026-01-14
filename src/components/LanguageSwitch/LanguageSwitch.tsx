import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'zh_tw', label: '繁體中文' },
  { code: 'zh_cn', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' }
];

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 初始化时如果没有语言或语言不在支持列表中，使用 zh_tw
  const getInitialLang = () => {
    const lang = i18n.language || localStorage.getItem('i18nextLng') || 'zh_tw';
    // 处理旧的语言代码格式（zh-cn, zh-tw）转换为新格式（zh_cn, zh_tw）
    let normalizedLang = lang;
    if (lang === 'zh-cn') normalizedLang = 'zh_cn';
    else if (lang === 'zh-tw') normalizedLang = 'zh_tw';
    else if (lang.startsWith('zh') && !lang.includes('_')) {
      // 如果是 zh 但没有下划线，根据其他信息判断
      if (lang.includes('CN') || lang.includes('Hans')) normalizedLang = 'zh_cn';
      else normalizedLang = 'zh_tw';
    }
    return ['zh_cn', 'zh_tw', 'en', 'ja', 'ko'].includes(normalizedLang) ? normalizedLang : 'zh_tw';
  };
  const [currentLang, setCurrentLang] = useState(getInitialLang());

  useEffect(() => {
    // 确保初始语言正确设置为 zh_tw
    if (!i18n.language || !['zh_cn', 'zh_tw', 'en', 'ja', 'ko'].includes(i18n.language)) {
      i18n.changeLanguage('zh_tw');
      setCurrentLang('zh_tw');
    } else {
      setCurrentLang(i18n.language);
    }

    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
  };

  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-4 py-2
          hover:shadow-md transition-all duration-200
          transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <Globe className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.label}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200
          overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150
                flex items-center justify-between
                ${currentLang === lang.code
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span>{lang.label}</span>
              {currentLang === lang.code && (
                <Check className="w-4 h-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
