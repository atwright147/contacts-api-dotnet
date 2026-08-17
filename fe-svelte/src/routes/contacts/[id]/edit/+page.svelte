<script lang="ts">
	import { page } from '$app/state';
	import { createQuery } from '@tanstack/svelte-query';
	import { getApiContactsById } from '$lib/../client/sdk.gen';
	import type { Contact } from '$lib/../client/types.gen';
	import ContactEditForm from './ContactEditForm.svelte';

	const id = $derived(Number(page.params.id));

	const query = createQuery<Contact>(() => ({
		queryKey: ['contact', { id }],
		queryFn: async () => {
			const { data } = await getApiContactsById({ path: { id }, throwOnError: true });
			return data;
		},
	}));
</script>

<h1 class="h1">Edit Contact</h1>

{#if query.isLoading}
	<p>Loading...</p>
{:else if query.isError}
	<p>Error loading contact.</p>
{:else if query.isSuccess}
	<ContactEditForm contact={query.data} {id} />
{/if}
