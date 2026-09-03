import { Group, NavLink } from '@mantine/core';
import { Link as RavigerLink } from 'raviger';
import type { JSX, ReactNode } from 'react';

import { useAuthStore } from '#stores/authStore';

import IconCalendar from '~icons/lucide/calendar';
import IconHome from '~icons/lucide/home';
import IconLogIn from '~icons/lucide/log-in';
import IconLogOut from '~icons/lucide/log-out';
import IconMessageCircle from '~icons/lucide/message-circle';
import IconPhone from '~icons/lucide/phone';
import IconSettings from '~icons/lucide/settings';
import IconUsers from '~icons/lucide/users';

interface Link {
  text: string;
  icon: ReactNode;
  path: string;
}

export interface Props {
  links: Link[];
}

export function Nav(): JSX.Element {
  const isAuthenticated = useAuthStore((state) => state.isAuthorised);

  return (
    <>
      <NavLink
        component={RavigerLink}
        label={
          <Group>
            <IconHome /> Home
          </Group>
        }
        href="/"
      />

      <NavLink
        component={RavigerLink}
        label={
          <Group>
            <IconMessageCircle /> Messages
          </Group>
        }
        href="/messages"
      />

      <NavLink
        component={RavigerLink}
        label={
          <Group>
            <IconPhone /> Calls
          </Group>
        }
        href="/calls"
      />

      <NavLink
        component={RavigerLink}
        label={
          <Group>
            <IconUsers /> Contacts
          </Group>
        }
        href="/contacts"
      />

      <NavLink
        component={RavigerLink}
        label={
          <Group>
            <IconCalendar /> Calendar
          </Group>
        }
        href="/calendar"
      />

      <NavLink
        component={RavigerLink}
        label={
          <Group>
            <IconSettings /> Settings
          </Group>
        }
        href="/settings"
      />

      {isAuthenticated && (
        <NavLink
          component={RavigerLink}
          label={
            <Group>
              <IconLogOut /> Logout
            </Group>
          }
          href="/logout"
        />
      )}

      {!isAuthenticated && (
        <NavLink
          component={RavigerLink}
          label={
            <Group>
              <IconLogIn /> Login
            </Group>
          }
          href="/login"
        />
      )}
    </>
  );
}
