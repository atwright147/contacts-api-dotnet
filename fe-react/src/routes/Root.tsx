import { AppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link as RavigerLink } from 'raviger';
import type { JSX, ReactNode } from 'react';

// const links = [
//   {
//     text: 'Home',
//     icon: <HomeIcon />,
//     path: '/',
//   },
//   {
//     text: 'Messages',
//     icon: <ForumIcon />,
//     path: '/messages',
//   },
//   {
//     text: 'Calls',
//     icon: <PhoneIcon />,
//     path: '/calls',
//   },
//   {
//     text: 'Contacts',
//     icon: <GroupIcon />,
//     path: '/contacts',
//   },
//   {
//     text: 'Calendar',
//     icon: <EventNoteIcon />,
//     path: '/calendar',
//   },
//   {
//     text: 'Settings',
//     icon: <SettingsIcon />,
//     path: '/settings',
//   },
// ];

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
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavLink component={RavigerLink} label="Home" href="/" />
        <NavLink component={RavigerLink} label="Login" href="/login" />
        <NavLink component={RavigerLink} label="Contacts" href="/contacts" />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
