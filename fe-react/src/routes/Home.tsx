import { Title, Typography } from '@mantine/core';
import { Agenda } from '../components/Agenda';
import { DataTable } from '../components/DataTable';

export function Home() {
  const head = [
      'id',
      'firstName',
      'lastName',
      'email',
    ];

  const body = [
    {
      id: 1,
      firstName: 'Andy',
      lastName: 'Wright',
      email: 'andy@example.com',
    },
    {
      id: 2,
      firstName: 'Beth',
      lastName: 'Michon',
      email: 'beth@example.com',
    },
    {
      id: 3,
      firstName: 'Sam',
      lastName: 'Wright',
      email: 'sam@example.com',
    },
  ];

  return (
    <>
      <Title order={1}>Home</Title>

      <div>
        <Agenda />

        <Title order={2}>Favourite Contacts</Title>

        <Typography>// ContactGrid</Typography>

        <DataTable head={head} body={body} />
      </div>
    </>
  );
}
