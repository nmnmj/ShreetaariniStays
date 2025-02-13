import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    "site.name": "Shree Taarini",
    "nav.callNow": "Call Now",
    "nav.admin": "Admin",
    
    // Hero
    "hero.title": "Shree Taarini Home Stay",
    "hero.subtitle": "Experience divine hospitality near the sacred Mahakal Temple",
    "hero.bookNow": "Book Your Stay Now",
    
    // Rooms
    "rooms.title": "Our Accommodations",
    "rooms.bookNow": "Book Now",
    "rooms.perNight": "/night",
    
    // Footer
    "footer.contact": "Contact Us",
    "footer.location": "Location",
    "footer.about": "About Us",
    "footer.aboutText": "Experience divine hospitality at Shree Taarini Home Stay, located near the sacred Mahakal Temple.",
    "footer.address": "Near Mahakal Temple\nUjjain, Madhya Pradesh"
  },
  hi: {
    // Navbar
    "site.name": "श्री तारिणी",
    "nav.callNow": "कॉल करें",
    "nav.admin": "एडमिन",
    
    // Hero
    "hero.title": "श्री तारिणी होम स्टे",
    "hero.subtitle": "पवित्र महाकाल मंदिर के पास दैवीय आतिथ्य का अनुभव करें",
    "hero.bookNow": "अभी बुक करें",
    
    // Rooms
    "rooms.title": "हमारे कमरे",
    "rooms.bookNow": "बुक करें",
    "rooms.perNight": "/रात्रि",
    
    // Footer
    "footer.contact": "संपर्क करें",
    "footer.location": "स्थान",
    "footer.about": "हमारे बारे में",
    "footer.aboutText": "श्री तारिणी होम स्टे में पवित्र महाकाल मंदिर के पास दैवीय आतिथ्य का अनुभव करें।",
    "footer.address": "महाकाल मंदिर के पास\nउज्जैन, मध्य प्रदेश"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
