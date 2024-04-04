import { create } from 'zustand';

interface  UserStoreState {
  user: null | { userName: string; token: string };
  isLoggedIn: boolean;
  setUser: (user: UserStoreState['user']) => void;
  logout: () => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export  default  useUserStore;
