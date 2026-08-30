import { useQuery } from '@tanstack/react-query';
import { getApiContactsOptions } from '~src/client/@tanstack/react-query.gen';
import { useAuthStore } from '~stores/authStore';
import { ContactsTable } from '../components/ContactsTable';
import { Title } from '@mantine/core';

export function Contacts() {
  const token = useAuthStore((s) => s.token);
  const { data, isLoading, isError, isFetching } = useQuery({
    ...getApiContactsOptions(),
    enabled: !!token,
  });

  return (
    <>
      <Title order={1}>Contacts</Title>

      {!isLoading && !isFetching && !isError && data && <ContactsTable data={data} />}
    </>
  );
}
