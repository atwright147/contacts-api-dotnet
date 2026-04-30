<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	const queryClient = new QueryClient()

	import { page } from '$app/state';
	import { AppBar, AppLayout, NavItem } from 'svelte-ux';

	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<AppLayout>
		<svelte:fragment slot="nav">
			<NavItem
				text="Home"
				currentUrl={page.url}
				path="/"
				classes={{ root: "pl-3", active: "bg-primary/10 text-primary" }}
			/>
			<NavItem
				text="About"
				currentUrl={page.url}
				path="/about"
				classes={{ root: "pl-3", active: "bg-primary/10 text-primary" }}
			/>
			<NavItem
				text="Contacts"
				currentUrl={page.url}
				path="/contacts"
				classes={{ root: "pl-3", active: "bg-primary/10 text-primary" }}
			/>
		</svelte:fragment>

		<AppBar title="Example" />
		<main>
			{@render children()}
		</main>
	</AppLayout>

  <SvelteQueryDevtools />
</QueryClientProvider>
