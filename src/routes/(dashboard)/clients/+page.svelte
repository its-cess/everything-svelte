<script lang="ts">
	import { onMount } from 'svelte';
	import { clients, loadClients } from '$lib/stores/ClientStore';

	import Search from '$lib/components/Search.svelte';
	import Button from '$lib/components/Button.svelte';
	import ClientRowHeader from './ClientRowHeader.svelte';
	import ClientRow from './ClientRow.svelte';
	import BlankState from './BlankState.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from './ClientForm.svelte';

	onMount(() => {
		loadClients();
	});

	let isClientFormShowing = false;

	const closePanel = () => {
		isClientFormShowing = false;
	};
</script>

<svelte:head><title>Clients | The Dollar Holler</title></svelte:head>

<div
	class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-7 lg:mb-16 gap-y-6 md:gap-y-4"
>
	<!-- SEARCH FIELD -->
	{#if $clients.length > 0}
		<Search />
	{:else}
		<div />
	{/if}

	<!-- NEW CLIENT BUTTON -->
	<div>
		<Button
			label="+ Client"
			onClick={() => {
				isClientFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- CLIENTS -->
<div>
	{#if $clients === null}
		Loading...
	{:else if $clients.length <= 0}
		<BlankState />
	{:else}
		<!-- client header row -->
		<ClientRowHeader />

		<!-- client rows -->
		<div class="flex flex-col-reverse">
			{#each $clients as client}
				<ClientRow {client} />
			{/each}
		</div>
	{/if}
</div>

{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm {closePanel} />
	</SlidePanel>
{/if}
