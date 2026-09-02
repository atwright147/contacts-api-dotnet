import { useQuery } from '@tanstack/react-query';
import { Title } from '@mantine/core';

import { getApiContactsOptions } from '~src/client/@tanstack/react-query.gen';
import { useAuthStore } from '~stores/authStore';
import { ContactsTable } from '~components/ContactsTable';
import { DataTable } from '~components/DataTable';

export function Contacts() {
  const token = useAuthStore((s) => s.token);
  const { data, isLoading, isError, isFetching } = useQuery({
    ...getApiContactsOptions(),
    enabled: !!token,
  });

  const head = ['head1', 'head2', 'head3'];
  const body = [
    { value1: 'item1-1', value2: 'item1-2', value3: 'item1-3' },
    { value1: 'item2-1', value2: 'item2-2', value3: 'item2-3' },
    { value1: 'item3-1', value2: 'item3-2', value3: 'item3-3' },
  ];

  return (
    <>
      <Title order={1}>Contacts</Title>

      {!isLoading && !isFetching && !isError && data && <ContactsTable data={data} />}

      <DataTable head={head} body={body} />
    </>
  );
}
