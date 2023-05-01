<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';

	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from './InvoiceRow.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';
	import BlankState from './BlankState.svelte';
	import Button from '$lib/components/Button.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';

	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';

	let isInvoiceFormShowing: boolean = false;

	onMount(() => {
		loadInvoices();
		console.log($invoices);
	});
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
	class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-7 lg:mb-16 gap-y-6 md:gap-y-4"
>
	<!-- SEARCH FIELD -->
	{#if $invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}

	<!-- NEW INVOICE BUTTON -->
	<div>
		<Button
			label="+ Invoice"
			onClick={() => {
				isInvoiceFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- INVOICE LIST -->
<div>
	<!-- invoices -->
	{#if $invoices === null}
		Loading...
	{:else if $invoices.length <= 0}
		<BlankState />
	{:else}
		<InvoiceRowHeader className="text-daisyBush" />
		<div class="flex flex-col-reverse">
			{#each $invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
	{/if}
</div>

<!-- SLIDE PANEL -->
{#if isInvoiceFormShowing}
	<SlidePanel
		on:closePanel={() => {
			isInvoiceFormShowing = false;
		}}
	>
		<InvoiceForm closePanel={() => (isInvoiceFormShowing = false)} />
	</SlidePanel>
{/if}
