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
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        setAuth: (token, user) => set({ token, user }),
        logout: () => {
          queryClient.clear();
          set({ token: null, user: null });
        },
      }),
      { name: 'authStore' },
    ),
    { enabled: true, name: 'authStore' },
  ),
);
