import { Table } from '@mantine/core';
import type { JSX, ReactNode } from 'react';

export type Row = Record<string, ReactNode>;
export type Head = string[];
export type Body<T extends Row = Row> = T[];

export interface Props<T extends Row = Row> {
  head: Head;
  body: Body<T>;
}

export function DataTable<T extends Row = Row>({ head, body }: Props<T>): JSX.Element {
  const rows = body.map((row, rowIndex) => (
    <Table.Tr key={rowIndex}>
      {Object.entries(row).map(([columnKey, value]) => (
        <Table.Td key={columnKey}>
          {value}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          {head.map((label) => (<Table.Th key={label}>{label}</Table.Th>))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
