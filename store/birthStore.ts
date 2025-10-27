import { create } from 'zustand';

interface Birth {
  id: string;
  childName: string;
  childFirstName: string;
  birthDate: string;
  birthPlace: string;
  gender: 'male' | 'female' | 'other';
  motherName: string;
  motherId: string;
  fatherName: string;
  fatherId: string;
  witnesses: string[];
  certificateStatus: 'pending' | 'verified' | 'approved' | 'issued' | 'rejected';
  certificateNumber?: string;
  createdAt: string;
  synced: boolean;
}

interface BirthState {
  births: Birth[];
  isLoading: boolean;
  addBirth: (birth: Omit<Birth, 'id' | 'createdAt' | 'synced' | 'certificateStatus'>) => void;
  updateBirth: (id: string, data: Partial<Birth>) => void;
  deleteBirth: (id: string) => void;
  updateCertificateStatus: (id: string, status: Birth['certificateStatus']) => void;
  syncBirths: () => Promise<void>;
}

export const useBirthStore = create<BirthState>((set, get) => ({
  births: [],
  isLoading: false,
  
  addBirth: (birth) => {
    const newBirth: Birth = {
      ...birth,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      certificateStatus: 'pending',
      synced: false,
    };
    
    set((state) => ({
      births: [...state.births, newBirth],
    }));
    
    // TODO: Sauvegarder dans AsyncStorage/SQLite
  },
  
  updateBirth: (id, data) => {
    set((state) => ({
      births: state.births.map((b) =>
        b.id === id ? { ...b, ...data } : b
      ),
    }));
  },
  
  deleteBirth: (id) => {
    set((state) => ({
      births: state.births.filter((b) => b.id !== id),
    }));
  },
  
  updateCertificateStatus: (id, status) => {
    set((state) => ({
      births: state.births.map((b) =>
        b.id === id ? { ...b, certificateStatus: status } : b
      ),
    }));
  },
  
  syncBirths: async () => {
    set({ isLoading: true });
    try {
      // TODO: Synchroniser avec le backend
      // Pour chaque birth avec synced: false:
      // - Envoyer au backend
      // - Marquer comme synced: true
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Sync error:', error);
      set({ isLoading: false });
    }
  },
}));

