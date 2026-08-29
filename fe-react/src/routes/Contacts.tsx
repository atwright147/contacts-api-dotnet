import { Table, type TableData } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getApiContactsOptions } from '~src/client/@tanstack/react-query.gen';
import { useAuthStore } from '~stores/authStore';
import { ContactsTable } from '../components/ContactsTable';

export function Contacts() {
  const token = useAuthStore((s) => s.token);
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useQuery({ ...getApiContactsOptions(), enabled: !!token });

  return (
    <>
      <h1>Contacts</h1>

      {!isLoading && !isFetching && !isError && data && (
        <ContactsTable data={data} />
      )}
    </>
  );
}
