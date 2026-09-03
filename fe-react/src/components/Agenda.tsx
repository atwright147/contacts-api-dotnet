import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Paper, Stack, Title, Typography } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { getApiContactsBirthdaysOptions } from '#client/@tanstack/react-query.gen';

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export const Agenda = () => {
  const { data } = useQuery(getApiContactsBirthdaysOptions());

  return (
    <>
      <Title order={1}>Upcoming Birthdays</Title>

      <Stack>
        {data?.map((contact) => {
          const date = dayjs(contact.dateOfBirth);

          return (
            <Paper component="section" key={contact.id}>
              <Title order={2}>{date.format('MMMM')}</Title>

              <Typography>
                {date.format('L')}
              </Typography>

              <Typography>
                {contact.firstName} {contact.lastName}
              </Typography>

              {/* <Typography>{contact.emails?.[0].email}</Typography> */}
            </Paper>
          );
        })}
      </Stack>
    </>
  );
};
