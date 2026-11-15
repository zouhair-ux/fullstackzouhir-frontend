import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'ar';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'fr',
    setLang: () => {},
    isAr: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('site_lang');
        return saved === 'ar' ? 'ar' : 'fr';
    });

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('site_lang', newLang);
    };

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, isAr: lang === 'ar' }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

