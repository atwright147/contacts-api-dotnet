<script lang="ts">
	import { AgGrid, makeSvelteCellRenderer } from 'ag-grid-svelte5-extended';
	import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
	import { colorSchemeDark, themeQuartz } from '@ag-grid-community/theming';
	import { type GridOptions } from '@ag-grid-community/core';
	import { createQuery } from '@tanstack/svelte-query';
	import { getApiContacts } from '$lib/../client/sdk.gen';
	import type { Contact } from '$lib/../client/types.gen';
	import EditButtonCell from '$lib/components/contacts/EditButtonCell.svelte';

	const query = createQuery<Contact[]>(() => ({
		queryKey: ['contact'],
		queryFn: async () => {
			const { data } = await getApiContacts({ throwOnError: true });
			return data;
		},
	}));

	const darkGridTheme = themeQuartz.withPart(colorSchemeDark);

	const gridOptions: GridOptions = {
		columnDefs: [
			{ field: 'firstName' },
			{ field: 'lastName' },
			{ field: 'email' },
			{ field: 'dateOfBirth' },
			{ field: 'isFavourite' },
			{ field: 'actions', cellRenderer: makeSvelteCellRenderer(EditButtonCell) },
		],
		loadThemeGoogleFonts: true,
		getRowId: (params) => String(params.data.id),
		domLayout: 'autoHeight',

		theme: darkGridTheme,
	};

	const modules = [ClientSideRowModelModule];
</script>

<h1 class="h1">Contacts</h1>

<AgGrid {gridOptions} rowData={query.data} {modules} />
