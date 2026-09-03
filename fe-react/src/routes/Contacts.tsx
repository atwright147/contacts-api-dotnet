import { useQuery } from '@tanstack/react-query';
import { Title } from '@mantine/core';
import { useMemo } from 'react';

import { getApiContactsOptions } from '#client/@tanstack/react-query.gen';
import { useAuthStore } from '#stores/authStore';
import { DataTable } from '#components/DataTable';

export function Contacts() {
  const token = useAuthStore((s) => s.token);
  const { data, isLoading, isError, isFetching } = useQuery({
    ...getApiContactsOptions(),
    enabled: !!token,
  });

  const head = [
    'Name',
    'Email',
    'Date of Birth',
    'Favorite',
  ];

  const body = useMemo(() => data?.map((row) => ({
    fullName: `${row.firstName} ${row.lastName}`,
    email: row.email,
    dateOfBirth: row.dateOfBirth,
    favorite: row.isFavorite,
  })), [data]);

  return (
    <>
      <Title order={1}>Contacts</Title>

      {!isLoading && !isFetching && !isError && body && <DataTable head={head} body={body} />}
    </>
  );
}
