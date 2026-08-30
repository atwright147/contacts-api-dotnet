import { Group, NavLink } from '@mantine/core';
import { Link as RavigerLink } from 'raviger';
import type { JSX, ReactNode } from 'react';

interface Link {
  text: string;
  icon: ReactNode;
  path: string;
}

export interface Props {
  links: Link[];
}

export function NavLinkList({ links }: Props): JSX.Element {
  return (
    <>
      {links.map((link) => {
        const label = (
          <>
            <Group>
              {link.icon} {link.text}
            </Group>
          </>
        );

        return <NavLink component={RavigerLink} label={label} href={link.path} key={link.path} />;
      })}
    </>
  );
}
