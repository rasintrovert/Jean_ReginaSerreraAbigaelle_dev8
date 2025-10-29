import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  colors: {
    // Couleurs principales
    primary: string;
    primaryDark: string;
    secondary: string;
    
    // Couleurs de surface
    background: string;
    surface: string;
    surfaceVariant: string;
    
    // Couleurs de texte
    text: string;
    textSecondary: string;
    textDisabled: string;
    
    // Couleurs d'état
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Couleurs d'interface
    border: string;
    borderLight: string;
    divider: string;
    
    // Couleurs d'interaction
    hover: string;
    pressed: string;
    focus: string;
    disabled: string;
    
    // Couleurs spéciales
    overlay: string;
    shadow: string;
  };
  
  typography: {
    // Tailles de police
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
    };
    
    // Poids de police
    fontWeight: {
      normal: '400';
      medium: '500';
      semibold: '600';
      bold: '700';
    };
    
    // Interlignage
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
  };
  
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  
  shadows: {
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}

// Thème clair - couleurs sobres et rassurantes
export const lightTheme: Theme = {
  colors: {
    primary: '#2f95dc',
    primaryDark: '#1e6ba8',
    secondary: '#6c757d',
    
    background: '#ffffff',
    surface: '#f8f9fa',
    surfaceVariant: '#e9ecef',
    
    text: '#212529',
    textSecondary: '#6c757d',
    textDisabled: '#adb5bd',
    
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
    
    border: '#dee2e6',
    borderLight: '#e9ecef',
    divider: '#f1f3f4',
    
    hover: '#f8f9fa',
    pressed: '#e9ecef',
    focus: '#2f95dc',
    disabled: '#f8f9fa',
    
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: '#000000',
  },
  
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Thème sombre - contrastes élevés et lisibilité optimale
export const darkTheme: Theme = {
  colors: {
    primary: '#4fc3f7',
    primaryDark: '#29b6f6',
    secondary: '#90a4ae',
    
    background: '#121212',
    surface: '#1e1e1e',
    surfaceVariant: '#2d2d2d',
    
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textDisabled: '#666666',
    
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
    
    border: '#333333',
    borderLight: '#404040',
    divider: '#2d2d2d',
    
    hover: '#2d2d2d',
    pressed: '#404040',
    focus: '#4fc3f7',
    disabled: '#2d2d2d',
    
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: '#000000',
  },
  
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Hook pour obtenir le thème actuel
export function useTheme(): Theme {
  const systemColorScheme = useColorScheme();
  const { appTheme } = useThemeStore();
  
  // Déterminer le thème actuel
  const currentMode = appTheme === 'system' ? systemColorScheme : appTheme;
  
  return currentMode === 'dark' ? darkTheme : lightTheme;
}

// Hook pour obtenir les couleurs du thème actuel
export function useThemeColors() {
  const theme = useTheme();
  return theme.colors;
}

// Hook pour obtenir la typographie du thème actuel
export function useThemeTypography() {
  const theme = useTheme();
  return theme.typography;
}

// Import du store de thème (déjà créé)
import { useThemeStore } from '@/store/themeStore';
