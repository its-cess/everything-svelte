<script lang="ts">
	import Search from '$lib/components/Search.svelte';

	import Tag from '$lib/components/Tag.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
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
		<h3>Amount</h3>
		<div />
		<div />
	</div>

	<!-- invoices -->
	<div
		class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
	>
		<div class="status"><Tag label="late" className="ml-auto lg:ml-0" /></div>
		<div class="text-sm lg:text-lg dueDate">8/1/2023</div>
		<div class="text-sm lg:text-lg invoiceNumber">12345</div>
		<div class="text-base lg:text-xl font-bold clientName">Compressed.fm</div>
		<div class="font-mono text-lg font-bold amount text-right">$504.00</div>
		<div class="text-sm lg:text-lg center viewButton">
			<a href="#" class="text-pastelPurple hover:text-daisyBush hidden lg:block"><View /></a>
		</div>
		<div class="text-sm lg:text-lg center moreButton">
			<buton class="text-pastelPurple hover:text-daisyBush hidden lg:block"><ThreeDots /></buton>
		</div>
	</div>
</div>

<CircledAmount label="Total" amount="$1,144.00" />

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}

	/* default grid-template-areas (MOBILE) */
	.invoice-row {
		grid-template-areas:
			'invoiceNumber invoiceNumber'
			'clientName amount'
			'dueDate status';
	}

	/* grid-template-areas for DESKTOP (lg+ screens) */
	@media (min-width: 1024px) {
		/* creating the grid-template-areas. on desktop they are all in a line: */
		.invoice-row {
			grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
		}
	}

	/* assigning the grid area with the class name of 'status' to the grid-template-area we defined as 'status' above.
   will do that with all the areas defined above. we are doing this because tailwind does not support grid-template-areas */
	.invoice-row .status {
		grid-area: status;
	}
	.invoice-row .dueDate {
		grid-area: dueDate;
	}

	.invoice-row .invoiceNumber {
		grid-area: invoiceNumber;
	}
	.invoice-row .clientName {
		grid-area: clientName;
	}
	.invoice-row .amount {
		grid-area: amount;
	}
	.invoice-row .viewButton {
		grid-area: viewButton;
	}
	.invoice-row .moreButton {
		grid-area: moreButton;
	}
</style>
