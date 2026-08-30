import { Title, Typography } from '@mantine/core';

export function ErrorPage() {
  const error = '';
  console.error(error);

  return (
    <div id="error-page">
      <Title order={1}>Oops!</Title>

      <Typography>Sorry, an unexpected error has occurred.</Typography>
      <Typography>
        {/* @ts-ignore */}
        <em>{error.statusText || error.message}</em>
      </Typography>
    </div>
  );
}
