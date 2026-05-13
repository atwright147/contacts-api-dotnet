<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
  import { getApiContactsById } from '$lib/../client/sdk.gen';
  import type { Contact } from '$lib/../client/types.gen';

  const query = createQuery<Contact>(() => ({
    queryKey: ['contact', { id: 1 }],
    queryFn: async () => {
      const { data } = await getApiContactsById({ path: { id: 1 }, throwOnError: true });
      return data;
    }
  }));

</script>

<h1 class="h1">Contact</h1>

{#if query.isLoading}
	<p>Loading...</p>
{:else if query.isError}
	<p>Error loading contact.</p>
{:else if query.data}
	<p><strong>First Name:</strong> {query.data.firstName}</p>
	<p><strong>Last Name:</strong> {query.data.lastName}</p>
	<p><strong>Email:</strong> {query.data.email}</p>
{/if}
