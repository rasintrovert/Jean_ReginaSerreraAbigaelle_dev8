import { useThemeStore } from '@/store/themeStore';
import { ThemeProvider } from '@/theme/ThemeProvider';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { loadTheme } = useThemeStore();

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {children}
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
