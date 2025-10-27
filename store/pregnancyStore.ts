import { create } from 'zustand';

interface Pregnancy {
  id: string;
  motherName: string;
  fatherName: string;
  lastMenstruationDate: string;
  location: string;
  prenatalCare: boolean;
  status: 'pending' | 'synced';
  createdAt: string;
}

interface PregnancyState {
  pregnancies: Pregnancy[];
  isLoading: boolean;
  addPregnancy: (pregnancy: Omit<Pregnancy, 'id' | 'createdAt' | 'status'>) => void;
  updatePregnancy: (id: string, data: Partial<Pregnancy>) => void;
  deletePregnancy: (id: string) => void;
  syncPregnancies: () => Promise<void>;
}

export const usePregnancyStore = create<PregnancyState>((set, get) => ({
  pregnancies: [],
  isLoading: false,
  
  addPregnancy: (pregnancy) => {
    const newPregnancy: Pregnancy = {
      ...pregnancy,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    set((state) => ({
      pregnancies: [...state.pregnancies, newPregnancy],
    }));
    
    // TODO: Sauvegarder dans AsyncStorage/SQLite
    // TODO: Tenter synchronisation immédiate
  },
  
  updatePregnancy: (id, data) => {
    set((state) => ({
      pregnancies: state.pregnancies.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    }));
  },
  
  deletePregnancy: (id) => {
    set((state) => ({
      pregnancies: state.pregnancies.filter((p) => p.id !== id),
    }));
  },
  
  syncPregnancies: async () => {
    set({ isLoading: true });
    try {
      // TODO: Synchroniser avec le backend
      // Pour chaque pregnancy avec status 'pending':
      // - Envoyer au backend
      // - Marquer comme 'synced'
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Sync error:', error);
      set({ isLoading: false });
    }
  },
}));

