import { Table } from '@mantine/core';
import type { JSX } from 'react';
import type { Contact } from '../client';

export function ContactsTable({ data }: { data: Contact[] }): JSX.Element {
  // 2. Map through the data array to create table rows
  const rows = data.map((contact) => (
    <Table.Tr key={contact.id}>
      <Table.Td>
        {contact.firstName} {contact.lastName}
      </Table.Td>
      <Table.Td>{contact.email}</Table.Td>
      <Table.Td>{contact.dateOfBirth ?? '–'}</Table.Td>
      <Table.Td>{contact.isFavorite}</Table.Td>
    </Table.Tr>
  ));

  // 3. Render the structure
  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Date of Birth</Table.Th>
          <Table.Th>Favorite</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
