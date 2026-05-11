<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	const queryClient = new QueryClient();

	import { page } from '$app/state';

	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div>
		<header>
			<h1>Example</h1>
			<nav>
				<a href="/" class={page.url.pathname === '/' ? 'active' : ''}>Home</a>
				<a href="/about" class={page.url.pathname.startsWith('/about') ? 'active' : ''}>About</a>
				<a href="/contacts" class={page.url.pathname.startsWith('/contacts') ? 'active' : ''}>Contacts</a>
			</nav>
		</header>

		<main>
			{@render children()}
		</main>
	</div>

	<SvelteQueryDevtools />
</QueryClientProvider>
