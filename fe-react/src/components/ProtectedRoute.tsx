import { Redirect } from 'raviger';
import type { JSX, ReactNode } from 'react';

import { useAuthStore } from '#stores/authStore';

export const ProtectedRoute = ({ children }: { children: ReactNode }): JSX.Element => {
  const isAuthorised = useAuthStore((state) => state.isAuthorised);

  if (!isAuthorised) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
