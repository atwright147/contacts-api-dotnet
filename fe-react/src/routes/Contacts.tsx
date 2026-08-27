import { useQuery } from '@tanstack/react-query';
import { getApiContactsOptions } from '~src/client/@tanstack/react-query.gen';
import { useAuthStore } from '~stores/authStore';

export function Contacts() {
  const token = useAuthStore((s) => s.token);
  const { data } = useQuery({ ...getApiContactsOptions(), enabled: !!token });

  return (
    <>
      <h1>Contacts</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
