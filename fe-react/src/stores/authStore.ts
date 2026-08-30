import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { queryClient } from '~utils/queryClient';

interface User {
  id: string;
  email: string;
  roles: string[];
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthorised: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        isAuthorised: false,
        setAuth: (token, user) => set({ token, user, isAuthorised: true }),
        logout: () => {
          queryClient.clear();
          set({ token: null, user: null, isAuthorised: false });
        },
      }),
      { name: 'authStore' },
    ),
    { enabled: true, name: 'authStore' },
  ),
);
