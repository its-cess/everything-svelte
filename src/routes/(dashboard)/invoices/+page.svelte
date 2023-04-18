<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';

	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from './InvoiceRow.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';
	import BlankState from './BlankState.svelte';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';

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
		<button
			class="relative whitespace-nowrap rounded-lg bg-lavenderIndigo px-5 lg:px-10 py-2 lg:py-3 font-sansSerif text-base lg:text-xl font-black text-white shadow-colored hover:shadow-coloredHover translate-y-0 hover:-translate-y-2 transition-all"
			>+ Invoice</button
		>
	</div>
</div>

<!-- INVOICE LIST -->
<div>
	<!-- header row -->

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
