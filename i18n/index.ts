/**
 * Système d'internationalisation pour GraceRegistry
 * Supporte le français (fr) et le créole haïtien (ht)
 */

import { fr } from './fr';
import { ht } from './ht';

export type Language = 'fr' | 'ht';

// Export des traductions par langue
export const translations = {
  fr,
  ht,
};

// Type pour les clés de traduction (pour l'autocomplétion TypeScript)
export type TranslationKey = 
  | `common.${keyof typeof fr.common}`
  | `auth.${keyof typeof fr.auth}`
  | `roles.${keyof typeof fr.roles}`
  | `agent.dashboard.${keyof typeof fr.agent.dashboard}`
  | `agent.navigation.${keyof typeof fr.agent.navigation}`
  | `agent.addModal.${keyof typeof fr.agent.addModal}`
  | `agent.history.${keyof typeof fr.agent.history}`
  | `agent.pregnancy.${keyof typeof fr.agent.pregnancy}`
  | `agent.birth.${keyof typeof fr.agent.birth}`
  | `agent.emergency.${keyof typeof fr.agent.emergency}`
  | `agent.profile.${keyof typeof fr.agent.profile}`
  | `agent.help.${keyof typeof fr.agent.help}`
  | `validation.${keyof typeof fr.validation}`
  | `errors.${keyof typeof fr.errors}`;

/**
 * Récupère une traduction par clé
 * @param language - La langue actuelle
 * @param key - La clé de traduction (ex: "agent.dashboard.welcome")
 * @param params - Paramètres optionnels pour remplacer des placeholders (ex: {{count}})
 */
export function getTranslation(
  language: Language,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let value: any = translations[language];

  // Navigation dans l'objet de traduction
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Si la clé n'existe pas, essayer de retourner la clé elle-même ou une valeur par défaut
      console.warn(`Translation key not found: ${key} for language ${language}`);
      return key;
    }
  }

  // Si la valeur est une chaîne, remplacer les paramètres
  if (typeof value === 'string' && params) {
    let result = value;
    for (const [paramKey, paramValue] of Object.entries(params)) {
      result = result.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramValue));
    }
    return result;
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Hook personnalisé pour utiliser les traductions dans les composants React
 * @example
 * const t = useTranslation();
 * <Text>{t('agent.dashboard.welcome')}</Text>
 * <Text>{t('agent.history.proofsCount', { count: 5 })}</Text>
 */
export function createUseTranslation(language: Language) {
  return (key: string, params?: Record<string, string | number>) => {
    return getTranslation(language, key, params);
  };
}

