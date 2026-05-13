<script lang="ts">
	import '../app.css';
	import './layout.css';

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

	const iconSize = 20;

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="grid h-screen grid-cols-[min-content_1fr] grid-rows-[auto_1fr]">
		<header class="col-span-full">
			<AppBar>
				<p class="h2">My App</p>
			</AppBar>
		</header>

		<aside class="hidden h-full w-min md:block">
			<nav class="h-full" aria-label="Main">
				<Navigation layout="rail" class="h-full border-r border-surface-500/20">
					<Navigation.Menu>
						<Navigation.TriggerAnchor
							href="/"
							class={activeClass('/')}
							aria-current={ariaCurrent('/')}
						>
							<HouseIcon width={iconSize} height={iconSize} />
							<Navigation.TriggerText>Home</Navigation.TriggerText>
						</Navigation.TriggerAnchor>

						<Navigation.TriggerAnchor
							href="/contacts"
							class={activeClass('/contacts')}
							aria-current={ariaCurrent('/contacts')}
						>
							<UserIcon width={iconSize} height={iconSize} />
							<Navigation.TriggerText>Contacts</Navigation.TriggerText>
						</Navigation.TriggerAnchor>

						<Navigation.TriggerAnchor
							href="/about"
							class={activeClass('/about')}
							aria-current={ariaCurrent('/about')}
						>
							<InfoIcon width={iconSize} height={iconSize} />
							<Navigation.TriggerText>About</Navigation.TriggerText>
						</Navigation.TriggerAnchor>

						<Navigation.TriggerAnchor
							href="/settings"
							class={activeClass('/settings')}
							aria-current={ariaCurrent('/settings')}
						>
							<SettingsIcon width={iconSize} height={iconSize} />
							<Navigation.TriggerText>Settings</Navigation.TriggerText>
						</Navigation.TriggerAnchor>
					</Navigation.Menu>
				</Navigation>
			</nav>
		</aside>

		<main class="p-4">
			{@render children()}
		</main>
		<SvelteQueryDevtools />
	</div>
</QueryClientProvider>
