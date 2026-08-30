import { Title, Typography } from '@mantine/core';

export function Home() {
  return (
    <>
      <Title order={1}>Home</Title>

      <div>
        <Typography>// Agenda</Typography>

        <Title order={2}>Favourite Contacts</Title>

        <Typography>// ContactGrid</Typography>
      </div>
    </>
  );
}
