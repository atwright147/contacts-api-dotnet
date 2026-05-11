<script lang="ts">
	import "../app.css";
	import "./layout.css";

	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';
	import HouseIcon from '~icons/lucide/house';
	import InfoIcon from '~icons/lucide/info';
	import UserIcon from '~icons/lucide/user';
	import SettingsIcon from '~icons/lucide/settings';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	const queryClient = new QueryClient();

	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';

	const isRouteActive = (targetPath: string) => {
		const currentPath = page.url.pathname;

		if (targetPath === '/') {
			return currentPath === '/';
		}

		return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
	};

	const activeClass = (targetPath: string) => (isRouteActive(targetPath) ? 'active' : '');
	const ariaCurrent = (targetPath: string) => (isRouteActive(targetPath) ? 'page' : undefined);

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div>
		<header>
			<AppBar>
				<h2 class="h2">My App</h2>
			</AppBar>
		</header>

		<aside class="hidden md:block">
			<Navigation layout="rail" class="h-full border-r border-surface-500/20">
				<Navigation.Menu>
					<Navigation.TriggerAnchor href="/" class={activeClass('/')} aria-current={ariaCurrent('/')}>
						<HouseIcon width={20} height={20} />
						<Navigation.TriggerText>Home</Navigation.TriggerText>
					</Navigation.TriggerAnchor>

					<Navigation.TriggerAnchor href="/contacts" class={activeClass('/contacts')} aria-current={ariaCurrent('/contacts')}>
						<UserIcon width={20} height={20} />
						<Navigation.TriggerText>Contacts</Navigation.TriggerText>
					</Navigation.TriggerAnchor>

					<Navigation.TriggerAnchor href="/about" class={activeClass('/about')} aria-current={ariaCurrent('/about')}>
						<InfoIcon width={20} height={20} />
						<Navigation.TriggerText>About</Navigation.TriggerText>
					</Navigation.TriggerAnchor>

					<Navigation.TriggerAnchor href="/settings" class={activeClass('/settings')} aria-current={ariaCurrent('/settings')}>
						<SettingsIcon width={20} height={20} />
						<Navigation.TriggerText>Settings</Navigation.TriggerText>
					</Navigation.TriggerAnchor>
				</Navigation.Menu>
			</Navigation>
		</aside>

		<main>
			{@render children()}
		</main>
	</div>

	<SvelteQueryDevtools />
</QueryClientProvider>
