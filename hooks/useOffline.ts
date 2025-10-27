import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useSyncStore } from '@/store/syncStore';

/**
 * Hook pour gérer la détection de connexion et synchronisation automatique
 */
export function useOffline() {
  const { isOnline, checkConnection, syncAll } = useSyncStore();

  useEffect(() => {
    // Vérifier la connexion initiale
    checkConnection();

    // Écouter les changements de connexion
    const unsubscribe = NetInfo.addEventListener((state) => {
      checkConnection();
      
      // Synchroniser automatiquement quand la connexion revient
      if (state.isConnected) {
        syncAll();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [checkConnection, syncAll]);

  return { isOnline };
}

