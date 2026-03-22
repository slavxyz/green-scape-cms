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
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.blog": "Blog",
  "nav.about": "About Us",

  // Hero
  "hero.title": "Transform Your\nOutdoor Space",
  "hero.subtitle": "Professional landscaping, mowing, planting, and irrigation services for homes and businesses.",

  // Services
  "services.title": "Our Services",
  "services.subtitle": "From one-time cleanups to full landscape transformations, we offer a complete range of outdoor services.",

  // CTA
  "cta.title": "Ready to Transform Your Yard?",
  "cta.subtitle": "Browse our past projects for inspiration, or get in touch today for a free consultation.",
  "cta.viewProjects": "View Our Projects",
  "cta.learnAbout": "Learn About Us",

  // Projects page
  "projects.title": "Our Projects",
  "projects.subtitle": "Explore our latest landscaping transformations, from residential gardens to commercial properties.",
  "projects.empty": "No projects yet. Check back soon!",

  // Blog page
  "blog.title": "Blog",
  "blog.subtitle": "Tips, news, and insights on landscaping, gardening, and outdoor living.",
  "blog.empty": "No blog posts yet. Check back soon!",
  "blog.readMore": "Read More",
  "blog.backToBlog": "Back to Blog",
  "blog.postNotFound": "Post Not Found",

  // About page
  "about.title": "About Us",
  "about.subtitle": "Get to know the team behind",
  "about.ourStory": "Our Story",
  "about.ourMission": "Our Mission",
  "about.experience": "Experience",
  "about.ourTeam": "Our Team",
  "about.ourTeamDescription": "A dedicated team of landscaping professionals passionate about creating beautiful outdoor spaces.",
  "about.meetTheTeam": "Meet the Team",
  "about.getInTouch": "Get in Touch",
  "about.getInTouchSubtitle": "Have a question or want to work with us? Drop us a message.",

  // Contact form
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.subject": "Subject",
  "contact.inquiryType": "Inquiry Type",
  "contact.selectType": "Select type (optional)",
  "contact.message": "Message",
  "contact.send": "Send Message",
  "contact.sending": "Sending…",
  "contact.namePlaceholder": "Your name",
  "contact.emailPlaceholder": "you@example.com",
  "contact.subjectPlaceholder": "What is this about?",
  "contact.messagePlaceholder": "Tell us more...",
  "contact.successTitle": "Message sent!",
  "contact.successDesc": "Thank you for reaching out. We'll get back to you soon.",
  "contact.errorTitle": "Something went wrong",
  "contact.errorDesc": "Please try again later.",
  "contact.inquiry.feedback": "Feedback",
  "contact.inquiry.collaboration": "Collaboration",
  "contact.inquiry.support": "Support",
  "contact.inquiry.general": "General Inquiry",

  // Footer
  "footer.quickLinks": "Quick Links",
  "footer.contactUs": "Contact Us",
  "footer.description": "Professional landscaping services to transform your outdoor spaces into beautiful, functional environments.",
  "footer.rights": "All rights reserved.",

  // Pagination
  "pagination.previous": "Previous",
  "pagination.next": "Next",
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
