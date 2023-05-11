<script lang="ts">
	import { convertDate } from '$lib/utils/dateHelpers';

	import LineItemRows from '../LineItemRows.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: { invoice: Invoice };

	const printInvoice = () => {
		console.log('Print Invoice.');
	};

	const copyLink = () => {
		console.log('Copy Link.');
	};

	const sendInvoice = () => {
		console.log('Send Invoice.');
	};

	const payInvoice = () => {
		console.log('Pay Invoice.');
	};
</script>

<div class="fixed z-0 mb-16 flex justify-between w-full max-w-screen-lg">
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex items-center gap-4">
		<Button
			label="Print"
			style="outline"
			height="short"
			isAnimated={false}
			onClick={printInvoice}
		/>
		<Button label="Copy Link" height="short" onClick={copyLink} />
		<Button label="Send" height="short" onClick={sendInvoice} />
		<Button label="Pay Invoice" height="short" onClick={payInvoice} />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-16 px-32 shadow-invoice"
>
	<div class="col-span-3">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="Compressed.fm"
		/>
	</div>

	<div class="col-span-2 col-start-5 pt-4">
		<div class="label">From</div>
		<p>
			Cecily Toro <br />
			123 Awesome Street <br />
			Awesomeville, OH 12345
		</p>
	</div>

	<div class="col-span-3">
		<div class="label">Bill To:</div>
		<p>
			<strong>{data.invoice.client.name}</strong><br />
			{data.invoice.client.email}<br />
			{data.invoice.client.street} <br />
			{data.invoice.client.city}, {data.invoice.client.state}
			{data.invoice.client.zip}
		</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoice.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.invoice.dueDate)}</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Issue Date</div>
		<p>{convertDate(data.invoice.issueDate)}</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>{data.invoice.subject}</p>
	</div>

	<div class="col-span-6">
		<LineItemRows
			lineItems={data.invoice.lineItems}
			isEditable={false}
			discount={data?.invoice?.discount || 0}
		/>
	</div>

	{#if data.invoice.notes}
		<div class="col-span-6">
			<div class="label">Notes</div>
			<p>{data.invoice.notes}</p>
		</div>
	{/if}

	{#if data.invoice.terms}
		<div class="col-span-6">
			<div class="label">Terms and Conditions</div>
			<p>{data.invoice.terms}</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
