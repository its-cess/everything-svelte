<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';
	import CancelIcon from '$lib/components/Icon/CancelIcon.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';
	import Send from '$lib/components/Icon/Send.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';

	import { centsToDollars, invoiceTotal } from '$lib/utils/moneyHelpers';
	import { convertDate, isLate } from '$lib/utils/dateHelpers';
	import { clickOutside } from '$lib/actions/ClickOutside';
	import { swipe } from '$lib/actions/Swipe';

	export let invoice: Invoice;

	let isAdditionalMenuShowing = false;
	let isOptionsDisabled = false;
	let isModalShowing = false;
	let isInvoiceFormShowing = false;
	let triggerReset = false;

	const handleDelete = () => {
		isModalShowing = true;
		isAdditionalMenuShowing = false;
	};

	const handleEdit = () => {
		isInvoiceFormShowing = true;
		isAdditionalMenuShowing = false;
	};

	const handleSendInvoice = () => {
		console.log('sending');
	};

	const getInvoiceLabel = () => {
		if (invoice.invoiceStatus === 'draft') {
			return 'draft';
		} else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return 'sent';
		} else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return 'late';
		} else if (invoice.invoiceStatus === 'paid') {
			isOptionsDisabled = true;
			return 'paid';
		}
	};
</script>

<div class="relative">
	<div
		use:swipe={{ triggerReset }}
		on:outOfView={() => {
			triggerReset = false;
		}}
		class="invoice-table invoice-row z-row relative items-center bg-white py-3 lg:py-6 rounded-lg shadow-tableRow"
	>
		<div class="status"><Tag label={getInvoiceLabel()} className="ml-auto lg:ml-0" /></div>
		<div class="text-sm lg:text-lg dueDate">{convertDate(invoice.dueDate)}</div>
		<div class="text-sm lg:text-lg invoiceNumber">{invoice.invoiceNumber}</div>
		<div class="text-base lg:text-xl font-bold clientName whitespace-nowrap truncate">
			{invoice.client.name}
		</div>
		<div class="font-mono text-lg font-bold amount text-right">
			${centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount))}
		</div>
		<div class="text-sm lg:text-lg center viewButton">
			<a
				href={`/invoices/${invoice.id}`}
				class="text-pastelPurple hover:text-daisyBush hidden lg:flex"><View /></a
			>
		</div>
		<div
			class="text-sm lg:text-lg center moreButton relative"
			use:clickOutside={() => (isAdditionalMenuShowing = false)}
		>
			<button
				class="text-pastelPurple hover:text-daisyBush hidden lg:flex"
				on:click={() => {
					isAdditionalMenuShowing = !isAdditionalMenuShowing;
				}}><ThreeDots /></button
			>
			{#if isAdditionalMenuShowing}
				<AdditionalOptions
					options={[
						{ label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
						{ label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
						{ label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
					]}
				/>
			{/if}
		</div>
	</div>

	<!-- swipe to reveal -->
	<div class="flex w-full items-center justify-around absolute inset-0 h-full z-rowActions">
		<button
			class="action-button"
			on:click={() => {
				triggerReset = true;
			}}
		>
			<CancelIcon width={32} height={32} />Cancel
		</button>

		{#if !isOptionsDisabled}
			<button class="action-button" on:click={handleEdit}>
				<Edit width={32} height={32} />Edit
			</button>
			<button class="action-button" on:click={handleSendInvoice}>
				<Send width={32} height={32} />Send
			</button>
		{/if}

		<button class="action-button" on:click={handleDelete}>
			<Trash width={32} height={32} />Delete
		</button>
		<a href={`/invoices/${invoice.id}`} class="action-button" on:click={handleDelete}>
			<View width={32} height={32} />View
		</a>
	</div>
</div>

<!-- CONFIRM DELETE MODAL -->
<ConfirmDelete {invoice} {isModalShowing} on:close={() => (isModalShowing = false)} />

<!-- SLIDE PANEL -->
{#if isInvoiceFormShowing}
	<SlidePanel
		on:closePanel={() => {
			isInvoiceFormShowing = false;
		}}
	>
		<InvoiceForm {invoice} formState="edit" closePanel={() => (isInvoiceFormShowing = false)} />
	</SlidePanel>
{/if}

<style lang="postcss">
	.action-button {
		@apply flex cursor-pointer flex-col items-center justify-center font-bold	text-daisyBush;
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
