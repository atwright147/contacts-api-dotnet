<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()),
  }))
</script>

<h1>Contacts</h1>

<pre>{JSON.stringify(query.data, null, 2)}</pre>
