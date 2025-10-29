import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export interface ScreenDimensions {
  width: number;
  height: number;
  isLandscape: boolean;
  isPortrait: boolean;
  isTablet: boolean;
  isPhone: boolean;
}

// Points de rupture pour responsive design
const BREAKPOINTS = {
  phone: 480,
  tablet: 768,
  desktop: 1024,
} as const;

export function useResponsive(): ScreenDimensions {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return calculateDimensions(width, height);
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(calculateDimensions(window.width, window.height));
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}

function calculateDimensions(width: number, height: number): ScreenDimensions {
  const isLandscape = width > height;
  const isPortrait = height > width;
  const isTablet = width >= BREAKPOINTS.tablet;
  const isPhone = width < BREAKPOINTS.tablet;

  return {
    width,
    height,
    isLandscape,
    isPortrait,
    isTablet,
    isPhone,
  };
}

// Hook pour les styles adaptatifs
export function useAdaptiveStyles<T>(
  phoneStyles: T,
  tabletStyles?: T,
  landscapeStyles?: T
): T {
  const { isTablet, isLandscape } = useResponsive();

  let styles = phoneStyles;

  if (isTablet && tabletStyles) {
    styles = { ...styles, ...tabletStyles };
  }

  if (isLandscape && landscapeStyles) {
    styles = { ...styles, ...landscapeStyles };
  }

  return styles;
}

// Hook pour les valeurs adaptatives
export function useAdaptiveValue<T>(
  phoneValue: T,
  tabletValue?: T,
  landscapeValue?: T
): T {
  const { isTablet, isLandscape } = useResponsive();

  if (isLandscape && landscapeValue !== undefined) {
    return landscapeValue;
  }

  if (isTablet && tabletValue !== undefined) {
    return tabletValue;
  }

  return phoneValue;
}
