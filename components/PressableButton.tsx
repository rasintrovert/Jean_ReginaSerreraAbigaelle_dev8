import { useTheme } from '@/theme';
import { useThemeContext } from '@/theme/ThemeProvider';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedComponents';

interface PressableButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

export function PressableButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  accessibilityLabel,
  style,
  ...props
}: PressableButtonProps) {
  const theme = useTheme();
  const { isDark } = useThemeContext();

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size
    switch (size) {
      case 'sm':
        baseStyle.paddingHorizontal = theme.spacing.md;
        baseStyle.paddingVertical = theme.spacing.sm;
        break;
      case 'md':
        baseStyle.paddingHorizontal = theme.spacing.lg;
        baseStyle.paddingVertical = theme.spacing.md;
        break;
      case 'lg':
        baseStyle.paddingHorizontal = theme.spacing.xl;
        baseStyle.paddingVertical = theme.spacing.lg;
        break;
    }

    // Variant
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = theme.colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary;
        break;
      case 'outline':
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.colors.border;
        baseStyle.backgroundColor = 'transparent';
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
    }

    // Disabled state
    if (disabled) {
      // En dark mode, rendre le fond plus clair (gris clair) au lieu d'utiliser opacity
      if (isDark && (variant === 'primary' || variant === 'secondary')) {
        baseStyle.backgroundColor = '#666666'; // Gris moyen en dark mode pour contraste avec texte noir
      } else {
        baseStyle.opacity = 0.5;
      }
    }

    // Full width
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  const getTextColor = () => {
    if (disabled) {
      // En dark mode, utiliser noir pour meilleure visibilité
      // En light mode, utiliser une couleur qui contraste bien
      if (isDark) {
        return '#000000'; // Noir en dark mode pour meilleure visibilité
      }
      // En light mode, utiliser une couleur plus foncée que le gris standard
      return '#212529'; // Couleur texte principale en light mode
    }
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#ffffff';
      case 'outline':
      case 'ghost':
        return theme.colors.text;
      default:
        return theme.colors.text;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'md':
        return 'base';
      case 'lg':
        return 'lg';
      default:
        return 'base';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyles(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      {...props}
    >
      <ThemedText
        size={getTextSize()}
        weight="semibold"
        style={{ color: getTextColor() }}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

