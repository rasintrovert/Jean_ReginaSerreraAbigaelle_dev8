/**
 * Hook pour accéder aux traductions dans les composants
 */

import { createUseTranslation } from '@/i18n';
import { useLanguageStore } from '@/store/languageStore';

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  return createUseTranslation(language);
}

