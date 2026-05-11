<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
  import { getApiContacts } from '$lib/../client/sdk.gen';
  import type { Contact } from '$lib/../client/types.gen';

  const query = createQuery<Contact[]>(() => ({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data } = await getApiContacts({ throwOnError: true });
      return data;
    }
  }));
</script>

<h1 class="h1">Contacts</h1>

{#if query.isPending}
  Loading...
{:else if query.isError}
  Error: {query.error.message}
{:else}
  {#each query.data ?? [] as contact (contact.id ?? `${contact.firstName}-${contact.lastName}-${contact.email}`)}
    <p>{contact.firstName} {contact.lastName} ({contact.email})</p>
  {/each}
{/if}

<details>
	<summary>Raw Data</summary>
	<pre>{JSON.stringify(query.data, null, 2)}</pre>
</details>
