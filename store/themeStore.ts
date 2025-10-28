import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type AppTheme = 'system' | 'light' | 'dark';

interface ThemeState {
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;
  loadTheme: () => Promise<void>;
}

const THEME_STORAGE_KEY = '@graceregistry:theme';

export const useThemeStore = create<ThemeState>((set, get) => ({
  appTheme: 'system',
  
  setAppTheme: async (theme: AppTheme) => {
    set({ appTheme: theme });
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },
  
  loadTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
        set({ appTheme: savedTheme as AppTheme });
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  },
}));

