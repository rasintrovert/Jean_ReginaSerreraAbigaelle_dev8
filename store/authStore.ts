import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'admin' | 'validator' | 'hospital';
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      // TODO: Appel API pour authentification
      // const response = await fetch('API_URL/login', { ... });
      // const { user, token } = await response.json();
      
      // Simulation temporaire
      const mockUser: User = {
        id: '1',
        name: 'Jean Dupont',
        email: credentials.email,
        role: 'agent',
        token: 'mock-token',
      };
      
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  register: async (data) => {
    set({ isLoading: true });
    try {
      // TODO: Appel API pour inscription
      // const response = await fetch('API_URL/register', { ... });
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Register error:', error);
      set({ isLoading: false });
      throw error;
    }
  },
}));

