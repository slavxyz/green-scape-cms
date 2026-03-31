import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

// All UI translation keys
export interface UITranslations {
  [key: string]: string;
}

export interface TranslationStore {
  [langCode: string]: UITranslations;
}

interface LanguageContextType {
  currentLang: string;
  setCurrentLang: (code: string) => void;
  languages: Language[];
  addLanguage: (lang: Language) => void;
  removeLanguage: (code: string) => void;
  translations: TranslationStore;
  setTranslation: (langCode: string, key: string, value: string) => void;
  setTranslations: (langCode: string, translations: UITranslations) => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = "greenscape-languages";
const LANG_KEY = "greenscape-current-lang";

// Default English UI strings
const defaultEnglish: UITranslations = {
  // Navigation
  "nav.home": "Начало",
  "nav.projects": "Проекти",
  "nav.blog": "Блог",
  "nav.about": "За нас",

  // Hero
  "hero.title": "Преобразете вашето\nвъншно пространство",
  "hero.subtitle": "Професионално озеленяване, косене, засаждане и напоителни системи за домове и бизнес обекти.",

  // Services
  "services.title": "Нашите услуги",
  "services.subtitle": "От еднократно почистване до пълна ландшафтна трансформация, ние предлагаме пълен набор от услуги за екстериора.",

  // CTA
  "cta.title": "Готови ли сте да преобразите двора си?",
  "cta.subtitle": "Разгледайте нашите минали проекти за вдъхновение или се свържете с нас още днес за безплатна консултация.",
  "cta.viewProjects": "Разгледайте нашите проекти",
  "cta.learnAbout": "Научете повече за нас",

  // APOB section
  "apob.title": "Член на АПОБ",
  "apob.description": "Зелено дворче е горд член на Асоциацията на Професионалните Озеленители в България (АПОБ). Членството ни гарантира спазване на най-високите стандарти в професионалното озеленяване и ландшафтния дизайн.",

  // Projects page
  "projects.title": "Нашите проекти",
  "projects.subtitle": "Разгледайте най-новите ни ландшафтни трансформации – от частни градини до търговски обекти.",
  "projects.empty": "Все още няма проекти. Проверете отново скоро!",

  // Blog page
  "blog.title": "Блог",
  "blog.subtitle": "Съвети, новини и идеи за озеленяване, градинарство и живот на открито.",
  "blog.empty": "Все още няма публикации. Проверете отново скоро!",
  "blog.readMore": "Прочетете повече",
  "blog.backToBlog": "Обратно към блога",
  "blog.postNotFound": "Публикацията не е намерена",

  // About page
  "about.title": "За нас",
  "about.subtitle": "Запознайте се с екипа зад проекта",
  "about.ourStory": "Нашата история",
  "about.ourMission": "Нашата мисия",
  "about.experience": "Опит",
  "about.ourTeam": "Нашият екип",
  "about.ourTeamDescription": "Всеотдаен екип от професионалисти в озеленяването, страстни в създаването на красиви външни пространства.",
  "about.meetTheTeam": "Запознайте се с екипа",
  "about.getInTouch": "Свържете се с нас",
  "about.getInTouchSubtitle": "Имате въпрос или искате да работим заедно? Изпратете ни съобщение.",

  // Contact form
  "contact.name": "Име",
  "contact.email": "Имейл",
  "contact.subject": "Тема",
  "contact.inquiryType": "Тип запитване",
  "contact.selectType": "Изберете тип (по избор)",
  "contact.message": "Съобщение",
  "contact.send": "Изпрати съобщение",
  "contact.sending": "Изпращане...",
  "contact.namePlaceholder": "Вашето име",
  "contact.emailPlaceholder": "you@example.com",
  "contact.subjectPlaceholder": "За какво се отнася запитването?",
  "contact.messagePlaceholder": "Разкажете ни повече...",
  "contact.successTitle": "Съобщението е изпратено!",
  "contact.successDesc": "Благодарим ви, че се свързахте с нас. Ще ви отговорим възможно най-скоро.",
  "contact.errorTitle": "Нещо се обърка",
  "contact.errorDesc": "Моля, опитайте отново по-късно.",
  "contact.inquiry.feedback": "Обратна връзка",
  "contact.inquiry.collaboration": "Сътрудничество",
  "contact.inquiry.support": "Поддръжка",
  "contact.inquiry.general": "Общо запитване",

  // Footer
  "footer.quickLinks": "Бързи връзки",
  "footer.contactUs": "Свържете се с нас",
  "footer.description": "Професионални услуги по озеленяване за превръщане на вашите външни пространства в красива и функционална среда.",
  "footer.rights": "Всички права запазени.",

  // Pagination
  "pagination.previous": "Предишна",
  "pagination.next": "Следваща",
};

const defaultLanguages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
];

interface StoredData {
  languages: Language[];
  translations: TranslationStore;
}

function loadStoredData(): StoredData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        languages: parsed.languages || defaultLanguages,
        translations: { en: { ...defaultEnglish, ...(parsed.translations?.en || {}) }, ...parsed.translations },
      };
    }
  } catch (e) {
    console.error("Failed to load language data:", e);
  }
  return { languages: defaultLanguages, translations: { en: defaultEnglish } };
}

function saveStoredData(data: StoredData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save language data:", e);
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [storedData, setStoredData] = useState<StoredData>(loadStoredData);
  const [currentLang, setCurrentLangState] = useState<string>(() => {
    return localStorage.getItem(LANG_KEY) || "en";
  });

  const persist = useCallback((data: StoredData) => {
    setStoredData(data);
    saveStoredData(data);
  }, []);

  const setCurrentLang = useCallback((code: string) => {
    setCurrentLangState(code);
    localStorage.setItem(LANG_KEY, code);
  }, []);

  const addLanguage = useCallback((lang: Language) => {
    setStoredData((prev) => {
      if (prev.languages.some((l) => l.code === lang.code)) return prev;
      const next = {
        languages: [...prev.languages, lang],
        translations: { ...prev.translations, [lang.code]: {} },
      };
      saveStoredData(next);
      return next;
    });
  }, []);

  const removeLanguage = useCallback((code: string) => {
    if (code === "en") return; // Can't remove default
    setStoredData((prev) => {
      const { [code]: _, ...restTranslations } = prev.translations;
      const next = {
        languages: prev.languages.filter((l) => l.code !== code),
        translations: restTranslations,
      };
      saveStoredData(next);
      return next;
    });
    setCurrentLangState((prev) => (prev === code ? "en" : prev));
  }, []);

  const setTranslation = useCallback((langCode: string, key: string, value: string) => {
    setStoredData((prev) => {
      const next = {
        ...prev,
        translations: {
          ...prev.translations,
          [langCode]: { ...(prev.translations[langCode] || {}), [key]: value },
        },
      };
      saveStoredData(next);
      return next;
    });
  }, []);

  const setTranslations = useCallback((langCode: string, translations: UITranslations) => {
    setStoredData((prev) => {
      const next = {
        ...prev,
        translations: {
          ...prev.translations,
          [langCode]: translations,
        },
      };
      saveStoredData(next);
      return next;
    });
  }, []);

  // Translation function with fallback to English
  const t = useCallback((key: string, fallback?: string): string => {
    const langTranslations = storedData.translations[currentLang];
    if (langTranslations && langTranslations[key]) return langTranslations[key];
    // Fallback to English
    const enTranslations = storedData.translations["en"];
    if (enTranslations && enTranslations[key]) return enTranslations[key];
    // Fallback to provided fallback or key itself
    return fallback || key;
  }, [currentLang, storedData.translations]);

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setCurrentLang,
        languages: storedData.languages,
        addLanguage,
        removeLanguage,
        translations: storedData.translations,
        setTranslation,
        setTranslations,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

// Export all translation keys for admin
export function getAllTranslationKeys(): string[] {
  return Object.keys(defaultEnglish);
}

export { defaultEnglish };
