<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
	import { convertDate, isLate } from '$lib/utils/dateHelpers';

	export let invoice: Invoice;

	const getInvoiceLabel = () => {
		if (invoice.invoiceStatus === 'draft') {
			return 'draft';
		} else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
			return 'sent';
		} else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
			return 'late';
		} else if (invoice.invoiceStatus === 'paid') {
			return 'paid';
		}
	};
</script>

<div
	class="invoice-table invoice-row items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
>
	<div class="status"><Tag label={getInvoiceLabel()} className="ml-auto lg:ml-0" /></div>
	<div class="text-sm lg:text-lg dueDate">{convertDate(invoice.dueDate)}</div>
	<div class="text-sm lg:text-lg invoiceNumber">{invoice.invoiceNumber}</div>
	<div class="text-base lg:text-xl font-bold clientName whitespace-nowrap truncate">
		{invoice.client.name}
	</div>
	<div class="font-mono text-lg font-bold amount text-right">
		${centsToDollars(sumLineItems(invoice.lineItems))}
	</div>
	<div class="text-sm lg:text-lg center viewButton">
		<a href="#" class="text-pastelPurple hover:text-daisyBush hidden lg:block"><View /></a>
	</div>
	<div class="text-sm lg:text-lg center moreButton">
		<buton class="text-pastelPurple hover:text-daisyBush hidden lg:block"><ThreeDots /></buton>
	</div>
</div>

<style lang="postcss">
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
