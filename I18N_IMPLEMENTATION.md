# Solution d'Internationalisation (i18n) - GraceRegistry

## 📋 Résumé de la solution

Cette solution permet à l'application GraceRegistry de supporter le **français** et le **créole haïtien** de manière globale, cohérente et persistante.

## ✅ Composants créés

### 1. Store de langue (`store/languageStore.ts`)
- Gestion de la langue avec Zustand (compatible avec l'architecture existante)
- Persistance dans AsyncStorage
- Langue par défaut : Créole haïtien (`ht`)
- API simple : `setLanguage(language)`, `loadLanguage()`

### 2. Fichiers de traduction
- **`i18n/fr.ts`** : ~200+ traductions en français
- **`i18n/ht.ts`** : ~200+ traductions en créole haïtien
- Couvrent tous les écrans principaux : dashboard, historique, grossesse, naissance, urgence, profil, aide

### 3. Système d'accès (`i18n/index.ts` + `hooks/useTranslation.ts`)
- Fonction `getTranslation()` pour récupérer les traductions
- Hook `useTranslation()` pour usage dans les composants React
- Support des paramètres dynamiques (ex: `{{count}}`)

### 4. Intégration globale
- **`components/AppProvider.tsx`** : Chargement automatique de la langue au démarrage
- **`app/(dashboard)/agent/profile/index.tsx`** : Sélecteur de langue fonctionnel et intégré

## 🎯 Fonctionnalités

✅ **Langue globale** : Un changement de langue affecte toute l'application instantanément  
✅ **Persistance** : La préférence de langue est sauvegardée et rechargée automatiquement  
✅ **Cohérence** : Tous les écrans utilisent les mêmes traductions  
✅ **Type-safe** : Support TypeScript pour éviter les erreurs  
✅ **Extensible** : Facile d'ajouter de nouvelles langues ou nouvelles traductions  

## 📖 Guide d'utilisation

### Utilisation dans un composant

```tsx
import { useTranslation } from '@/hooks/useTranslation';

export default function MyScreen() {
  const t = useTranslation();
  
  return (
    <ThemedView>
      <ThemedText>{t('agent.dashboard.welcome')}</ThemedText>
      <ThemedText>{t('agent.dashboard.proofsCount', { count: 5 })}</ThemedText>
    </ThemedView>
  );
}
```

### Changer la langue programmatiquement

```tsx
import { useLanguageStore } from '@/store/languageStore';

const { language, setLanguage } = useLanguageStore();

// Passer en français
setLanguage('fr');

// Passer en créole
setLanguage('ht');
```

### Accéder à la langue actuelle

```tsx
const language = useLanguageStore((state) => state.language);
// Retourne 'fr' ou 'ht'
```

## 🔄 Migration progressive

### Phase 1 : Infrastructure ✅ (TERMINÉE)
- [x] Créer le store de langue
- [x] Créer les fichiers de traduction
- [x] Créer le hook useTranslation
- [x] Intégrer dans AppProvider
- [x] Mettre en place le sélecteur dans le profil

### Phase 2 : Migration des écrans (À FAIRE)

#### Priorité haute
1. **Dashboard Agent** (`app/(dashboard)/agent/index.tsx`)
   - Titres et actions rapides
   - Navigation
   - Modal "Ajouter"

2. **Historique** (`app/(dashboard)/agent/history/index.tsx`)
   - Titres et filtres
   - Messages de recherche
   - Textes des cartes de preuve

3. **Formulaires** 
   - Grossesse (`app/(dashboard)/agent/pregnancy/index.tsx`)
   - Naissance (`app/(dashboard)/agent/birth/index.tsx`)
   - Urgence (`app/(dashboard)/agent/emergency/index.tsx`)

#### Priorité moyenne
4. **Autres écrans**
   - Aide (`app/(dashboard)/agent/help/index.tsx`)
   - Login (`app/(auth)/login.tsx`)

### Exemple de migration d'un écran

**Avant** :
```tsx
<ThemedText>Mon Profil</ThemedText>
<ThemedButton>Enregistrer</ThemedButton>
<ThemedText>Bienvenue</ThemedText>
```

**Après** :
```tsx
const t = useTranslation();

<ThemedText>{t('agent.profile.title')}</ThemedText>
<ThemedButton>{t('common.save')}</ThemedButton>
<ThemedText>{t('agent.dashboard.welcome')}</ThemedText>
```

## 📂 Structure des traductions

```
common.*              - Termes communs réutilisables
auth.*                - Authentification
roles.*               - Rôles (agent, admin, etc.)
agent.dashboard.*     - Écran d'accueil agent
agent.navigation.*    - Navigation (home, history, etc.)
agent.addModal.*      - Modal d'ajout
agent.history.*       - Historique des preuves
agent.pregnancy.*     - Formulaire grossesse
agent.birth.*         - Formulaire naissance
agent.emergency.*     - Signalement urgence
agent.profile.*       - Profil et paramètres
agent.help.*          - Aide et support
validation.*          - Messages de validation
errors.*              - Messages d'erreur
```

## 🛠️ Ajouter de nouvelles traductions

1. **Ajouter dans `i18n/fr.ts`** :
```typescript
agent: {
  dashboard: {
    newFeature: 'Nouvelle fonctionnalité',
  },
}
```

2. **Ajouter dans `i18n/ht.ts`** :
```typescript
agent: {
  dashboard: {
    newFeature: 'Nouvo fonksyonalite',
  },
}
```

3. **Utiliser dans le composant** :
```tsx
const t = useTranslation();
<ThemedText>{t('agent.dashboard.newFeature')}</ThemedText>
```

## 🔍 Points d'attention

1. **Synchronisation** : Toujours ajouter les traductions dans les DEUX fichiers (fr.ts ET ht.ts)
2. **Clés hiérarchiques** : Utiliser des noms de clés logiques et organisés
3. **Paramètres** : Pour les valeurs dynamiques, utiliser `{{paramName}}` dans les traductions
4. **Textes techniques** : Les noms de fichiers, codes d'erreur peuvent rester en anglais
5. **Noms propres** : Les noms propres (GraceRegistry, Haïti) peuvent rester tels quels

## 📊 État actuel

- ✅ Infrastructure créée et testée
- ✅ Sélecteur de langue fonctionnel dans le profil
- ✅ Prêt pour la migration progressive des écrans
- ⏳ Migration des écrans (en attente)

## 🚀 Prochaines étapes recommandées

1. Tester le changement de langue depuis le profil
2. Migrer un écran simple en premier (ex: dashboard agent)
3. Vérifier que tout fonctionne dans les deux langues
4. Continuer la migration écran par écran
5. Tester l'ensemble de l'application en français et créole

## 📝 Notes techniques

- Le store de langue utilise la même approche que le store de thème (cohérence architecturale)
- Les traductions sont typées pour éviter les erreurs de clés
- Le système est extensible : facile d'ajouter l'anglais ou d'autres langues plus tard
- Les performances sont optimisées : les traductions sont chargées une seule fois

