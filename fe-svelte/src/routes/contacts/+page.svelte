<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery(() => ({
    queryKey: ['contacts'],
    queryFn: () => fetch('https://localhost:7053/api/Contacts').then(res => res.json()),
  }));
</script>

<h1>Contacts</h1>

<details>
	<summary>Raw Data</summary>
	<pre>{JSON.stringify(query.data, null, 2)}</pre>
</details>
