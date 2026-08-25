import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type Routes, useRoutes } from 'raviger';
import type { JSX } from 'react';
import { MantineProvider } from '@mantine/core';

import { Calendar } from '~routes/Calendar.tsx';
import { Calls } from '~routes/Calls.tsx';
import { Contacts } from '~routes/Contacts.tsx';
import { Home } from '~routes/Home.tsx';
import { Messages } from '~routes/Messages.tsx';
import { Root } from '~routes/Root.tsx';
import { Settings } from '~routes/Settings.tsx';

// import 'normalize.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css';

const routes = {
  '/': () => <Home />,
  '/calendar': () => <Calendar />,
  '/calls': () => <Calls />,
  '/contacts': () => <Contacts />,
  '/home': () => <Home />,
  '/messages': () => <Messages />,
  '/settings': () => <Settings />,
} satisfies Routes<string>;

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const route = useRoutes(routes, { basePath: base });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Root>{route}</Root>
      </MantineProvider>
    </QueryClientProvider>
  );
};
