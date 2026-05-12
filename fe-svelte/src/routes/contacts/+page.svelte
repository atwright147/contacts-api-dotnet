<script lang="ts">
	import { AgGrid } from "ag-grid-svelte5-extended";
	import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
	import { colorSchemeDark, themeQuartz } from "@ag-grid-community/theming";
	import { type GridOptions } from "@ag-grid-community/core";
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

	const darkGridTheme = themeQuartz.withPart(colorSchemeDark);

	const gridOptions: GridOptions = {
		columnDefs: [
			{ field: "firstName" },
			{ field: "lastName" },
			{ field: "email" },
			{ field: "dateOfBirth" },
			{ field: "isFavourite" },
		],
		getRowId: (params) => params.data.id,
		theme: darkGridTheme
	};

	const modules = [ClientSideRowModelModule];
</script>

<h1 class="h1">Contacts</h1>

<AgGrid {gridOptions} rowData={query.data} {modules} />

<details>
	<summary>Raw Data</summary>
	<pre>{JSON.stringify(query.data, null, 2)}</pre>
</details>
