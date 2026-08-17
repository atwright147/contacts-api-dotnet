<script lang="ts">
	import { onMount } from 'svelte';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { createForm } from '@tanstack/svelte-form';
	import { putApiContactsById } from '$lib/../client/sdk.gen';
	import type { Contact } from '$lib/../client/types.gen';

	let { contact, id }: { contact: Contact; id: number } = $props();

	const queryClient = useQueryClient();
	const inputClass =
		'rounded-md border border-surface-500/50 bg-surface-900/70 px-3 py-2 text-surface-50 placeholder:text-surface-300 focus:border-primary-400 focus:outline-none';

	const mutation = createMutation(() => ({
		mutationFn: async (values: Contact) => {
			await putApiContactsById({ path: { id }, body: values, throwOnError: true });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['contact', { id }] });
		},
	}));

	const form = createForm(() => ({
		defaultValues: {
			firstName: contact.firstName,
			lastName: contact.lastName,
			email: contact.email,
		},
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value);
		},
	}));

	onMount(() => {
		form.reset({
			firstName: contact.firstName,
			lastName: contact.lastName,
			email: contact.email,
		});
	});
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		form.handleSubmit();
	}}
>
	<div class="flex flex-col gap-4">
		<div class="field">
			<form.Field name="firstName">
				{#snippet children(field)}
					<label for="firstName">First Name</label>
					<input
						class={inputClass}
						name="firstName"
						id="firstName"
						value={field.state.value ?? ''}
						oninput={(event) => field.handleChange(event.currentTarget.value)}
						onblur={() => field.handleBlur()}
					/>
				{/snippet}
			</form.Field>
		</div>

		<div class="field">
			<form.Field name="firstName">
				{#snippet children(field)}
					<label for="firstName">
						First Name
						<input
							class={inputClass}
							name="firstName"
							value={field.state.value ?? ''}
							oninput={(event) => field.handleChange(event.currentTarget.value)}
							onblur={() => field.handleBlur()}
						/>
					</label>
				{/snippet}
			</form.Field>
		</div>

		<div class="field">
			<form.Field name="lastName">
				{#snippet children(field)}
					<label for="lastName">Last Name</label>
					<input
						class={inputClass}
						name="lastName"
						id="lastName"
						value={field.state.value ?? ''}
						oninput={(event) => field.handleChange(event.currentTarget.value)}
						onblur={() => field.handleBlur()}
					/>
				{/snippet}
			</form.Field>
		</div>

		<div class="field">
			<form.Field name="email">
				{#snippet children(field)}
					<label for="email">Email</label>
					<input
						class={inputClass}
						name="email"
						id="email"
						type="email"
						value={field.state.value ?? ''}
						oninput={(event) => field.handleChange(event.currentTarget.value)}
						onblur={() => field.handleBlur()}
					/>
				{/snippet}
			</form.Field>
		</div>

		<button type="submit" disabled={mutation.isPending}>
			{mutation.isPending ? 'Saving...' : 'Save'}
		</button>
	</div>

	{#if mutation.isSuccess}
		<p>Saved successfully.</p>
	{/if}
	{#if mutation.isError}
		<p>Error saving contact.</p>
	{/if}
</form>

<style>
	@reference "../../../layout.css";

	.field {
		@apply flex flex-col;
	}
</style>
