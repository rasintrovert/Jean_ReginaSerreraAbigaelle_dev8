import { create } from 'zustand';
import NetInfo from '@react-native-community/netinfo';

interface SyncState {
  isOnline: boolean;
  pendingSync: {
    pregnancies: number;
    births: number;
  };
  isSyncing: boolean;
  lastSyncDate: Date | null;
  checkConnection: () => void;
  syncAll: () => Promise<void>;
}

export const useSyncStore = create<SyncState>((set, get) => ({
  isOnline: false,
  pendingSync: { pregnancies: 0, births: 0 },
  isSyncing: false,
  lastSyncDate: null,
  
  checkConnection: () => {
    NetInfo.fetch().then((state) => {
      set({ isOnline: state.isConnected ?? false });
    });
  },
  
  syncAll: async () => {
    const { isOnline } = get();
    
    if (!isOnline) {
      console.log('No internet connection. Sync will happen when connection is restored.');
      return;
    }
    
    set({ isSyncing: true });
    try {
      // TODO: Appeler pregnancyStore.syncPregnancies()
      // TODO: Appeler birthStore.syncBirths()
      
      set({ 
        isSyncing: false, 
        lastSyncDate: new Date(),
        pendingSync: { pregnancies: 0, births: 0 },
      });
    } catch (error) {
      console.error('Sync all error:', error);
      set({ isSyncing: false });
    }
  },
}));

// Écouter les changements de connexion
NetInfo.addEventListener((state) => {
  useSyncStore.getState().checkConnection();
  
  // Synchroniser automatiquement quand la connexion revient
  if (state.isConnected) {
    useSyncStore.getState().syncAll();
  }
});

