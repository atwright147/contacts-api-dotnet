import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { JSX, ReactNode } from 'react';

import IconCalendar from '~icons/lucide/calendar';
import IconHome from '~icons/lucide/home';
import IconLogIn from '~icons/lucide/log-in';
import IconMessageCircle from '~icons/lucide/message-circle';
import IconPhone from '~icons/lucide/phone';
import IconSettings from '~icons/lucide/settings';
import IconUsers from '~icons/lucide/users';

import { NavLinkList } from '../components/NavLinkList';


const links = [
  {
    text: 'Home',
    icon: <IconHome />,
    path: '/',
  },
  {
    text: 'Messages',
    icon: <IconMessageCircle />,
    path: '/messages',
  },
  {
    text: 'Calls',
    icon: <IconPhone />,
    path: '/calls',
  },
  {
    text: 'Contacts',
    icon: <IconUsers />,
    path: '/contacts',
  },
  {
    text: 'Calendar',
    icon: <IconCalendar />,
    path: '/calendar',
  },
  {
    text: 'Settings',
    icon: <IconSettings />,
    path: '/settings',
  },
  {
    text: 'Login',
    icon: <IconLogIn />,
    path: '/login',
  },
];

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
        Header
      </AppShell.Header>

      <AppShell.Navbar>
        <NavLinkList links={links} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
