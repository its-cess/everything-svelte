<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';

	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from './InvoiceRow.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
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
	<Search />

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
	<div class="table-header hidden lg:grid invoice-table text-daisyBush">
		<h3>Status</h3>
		<h3>Due Date</h3>
		<h3>ID</h3>
		<h3>Client</h3>
		<h3 class="text-right">Amount</h3>
		<div />
		<div />
	</div>

	<!-- invoices -->
	<div class="flex flex-col-reverse">
		{#each $invoices as invoice}
			<InvoiceRow {invoice} />
		{/each}
	</div>
</div>

<CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}
</style>
