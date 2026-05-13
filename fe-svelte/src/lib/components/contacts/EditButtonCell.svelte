<script lang="ts">
	import type { ICellRendererParams } from '@ag-grid-community/core';
	import type { Contact } from '$lib/../client/types.gen';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { data }: ICellRendererParams<Contact> = $props();

	const handleClick = () => {
		if (!data?.id) return;
		goto(resolve(`/contacts/${data.id}/edit`));
	};
</script>

<button type="button" class="btn preset-filled" onclick={handleClick}>Edit</button>
