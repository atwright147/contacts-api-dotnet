import { Redirect } from 'raviger';

import { useAuthStore } from '~stores/authStore';

export function Logout() {
  const logout = useAuthStore((state) => state.logout);
  logout();

  return <Redirect to="/login" />;
}
