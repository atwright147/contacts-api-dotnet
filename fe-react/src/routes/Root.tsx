import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { JSX, ReactNode } from 'react';

import { Nav } from '../components/Nav';

export const Root = ({ children }: { children: ReactNode }): JSX.Element => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        Header
      </AppShell.Header>

      <AppShell.Navbar>
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
