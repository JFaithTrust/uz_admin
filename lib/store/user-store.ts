import { create } from "zustand";


interface  UserStoreState {
  user: null | {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    email: string;
    token: string;
    phoneNumber: string;
  };
  isLoggedIn: boolean;
  setUser: (user: UserStoreState["user"]) => void;
  logout: () => void;
}

const useUserStore = create<UserStoreState>((set) => {
  // Load user data from localStorage on initialization
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  return {
    user: initialUser,
    isLoggedIn: initialUser !== null,
    setUser: (user) => {
      set({ user, isLoggedIn: true });
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
      set({ user: null, isLoggedIn: false });
      localStorage.removeItem('user');
    },
  };
});

export default useUserStore;
