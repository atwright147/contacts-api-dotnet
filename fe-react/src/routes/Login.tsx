import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import type { JSX } from 'react';
import { Button, Stack, TextInput, Title } from '@mantine/core';
import { useNavigate } from 'raviger';

import { postApiAuthLoginMutation } from '~src/client/@tanstack/react-query.gen';
import { useAuthStore } from '~stores/authStore';

type FormValues = {
  email: string;
  password: string;
};

export function Login(): JSX.Element {
  const { handleSubmit, control } = useForm<FormValues>();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const login = useMutation({
    ...postApiAuthLoginMutation(),
    onSuccess: (data) => {
      if (data.token && data.id && data.email && data.roles) {
        setAuth(data.token, {
          id: data.id,
          email: data.email,
          roles: data.roles,
        });
        navigate('/home');
      }
    },
  });

  return (
    <>
      <Title order={1}>Login</Title>

      <form onSubmit={handleSubmit((values) => login.mutate({ body: values }))}>
        <Stack gap="md">
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email is required' }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <TextInput
                label="Email"
                value={value ?? ''}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <TextInput
                label="Password"
                type="password"
                value={value ?? ''}
                onChange={onChange}
                onBlur={onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          {login.isError && <TextInput error="Invalid email or password" />}

          <Button type="submit" loading={login.isPending}>
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
