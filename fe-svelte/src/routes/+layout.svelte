<script lang="ts">
	import { page } from '$app/state';
	import { AppBar, AppLayout, NavItem } from 'svelte-ux';

	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

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
	</svelte:fragment>

	<AppBar title="Example" />
	<main>
		{@render children()}
	</main>
</AppLayout>