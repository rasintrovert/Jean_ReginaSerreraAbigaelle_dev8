import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type AppLanguage = 'fr' | 'ht';

interface LanguageState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  loadLanguage: () => Promise<void>;
}

const LANGUAGE_STORAGE_KEY = '@graceregistry:language';

// Langue par défaut : Créole haïtien
const DEFAULT_LANGUAGE: AppLanguage = 'ht';

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: DEFAULT_LANGUAGE,
  
  setLanguage: async (language: AppLanguage) => {
    set({ language });
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  },
  
  loadLanguage: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'ht')) {
        set({ language: savedLanguage as AppLanguage });
      } else {
        // Si aucune langue sauvegardée, utiliser la langue par défaut
        set({ language: DEFAULT_LANGUAGE });
      }
    } catch (error) {
      console.error('Failed to load language:', error);
      set({ language: DEFAULT_LANGUAGE });
    }
  },
}));

