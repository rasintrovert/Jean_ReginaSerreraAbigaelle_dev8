# GraceRegistry

Application mobile pour l'enregistrement et la gestion des certificats de naissance en Haïti.

## 📋 Description

GraceRegistry est une application mobile développée avec React Native et Expo qui garantit que chaque enfant né en Haïti reçoive immédiatement un certificat de naissance légal, même dans les zones rurales dépourvues d'accès à Internet.

## 🎯 Modules principaux

- **Enregistrement de grossesse** : Suivi des parents et de la grossesse
- **Enregistrement de naissance** : Informations détaillées sur l'enfant, les parents, le lieu et les témoins
- **Génération de certificats PDF** : Création automatique avec différents statuts
- **Gestion et validation multi-niveaux** : Contrôle administratif à plusieurs niveaux
- **Synchronisation hors ligne** : Travail possible sans connexion Internet
- **Tableau de bord administratif** : Statistiques et rapports en temps réel

## 🚀 Démarrage rapide

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI globalement installé

### Installation

```bash
# Cloner le repository
git clone [URL]
cd GraceRegistry

# Installer les dépendances
npm install

# Démarrer l'application
npm start
```

### Démarrage sur différents plateformes

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📁 Structure du projet

```
GraceRegistry/
├── app/                    # Expo Router (navigation)
│   ├── (auth)/            # Authentification
│   └── (dashboard)/       # Tableaux de bord par rôle
├── components/            # Composants réutilisables
├── store/                 # Zustand stores (état global)
├── types/                 # Types TypeScript
├── utils/                 # Fonctions utilitaires
├── constants/             # Constantes de configuration
└── assets/               # Images, fonts, etc.
```

## 🔐 Rôles utilisateurs

- **Agent de terrain** : Enregistrement des grossesses et naissances
- **Hôpital** : Enregistrement et suivi médical
- **Validateur** : Validation des enregistrements
- **Administrateur** : Gestion complète et génération de certificats

## 🛠️ Technologies utilisées

- React Native (0.81.5)
- Expo (SDK 54)
- Expo Router (navigation basée sur les fichiers)
- TypeScript
- Zustand (gestion d'état)
- React Hook Form + Zod (formulaires et validation)
- NetInfo (détection de connexion)

## 📝 TODO

Voir les fichiers pour les TODOs détaillés :
- Authentification complète
- Formulaires d'enregistrement
- Génération PDF
- Synchronisation offline
- Tests
- Documentation API

## 📄 Licence

[À déterminer]

