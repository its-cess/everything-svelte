<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';
	import { settings, loadSettings } from '$lib/stores/SettingsStore';
	import { convertDate } from '$lib/utils/dateHelpers';

	import LineItemRows from '../LineItemRows.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: { invoice: Invoice };

	let copyLinkLabel = 'Copy Link';

	onMount(() => {
		loadSettings();
	});

	const printInvoice = () => {
		window.print();
	};

	const copyLink = () => {
		navigator.clipboard.writeText($page.url.href);
		copyLinkLabel = 'Copied!';

		setTimeout(() => {
			copyLinkLabel = 'Copy Link';
		}, 1250);
	};

	const sendInvoice = () => {
		console.log('Send Invoice.');
	};

	const payInvoice = () => {
		console.log('Pay Invoice.');
	};
</script>

<div
	class="fixed z-0 mb-16 flex flex-col md:flex-row gap-y-5 px-4 lg:px-0 justify-between w-full max-w-screen-lg"
>
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
		<Button
			label="Print"
			style="outline"
			height="short"
			isAnimated={false}
			onClick={printInvoice}
		/>
		<Button
			label={copyLinkLabel}
			height="short"
			onClick={copyLink}
			className="min-w-[100px] sm:min-w-[168px] justify-center"
		/>
		<Button label="Send" height="short" onClick={sendInvoice} />
		<Button label="Pay Invoice" height="short" onClick={payInvoice} />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-8 md:py-16 px-5 md:px-32 shadow-invoice"
>
	<div class="sm:col-span-3 col-span-6">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="Compressed.fm"
		/>
	</div>

	<div class="col-span-6 sm:col-span-2 sm:col-start-5 pt-4">
		<!-- had to add if check for $settings, because it needed to wait for it to load the settings before it could display the info.-->
		{#if $settings && $settings.myName}
			<div class="label">From</div>
			<p>
				{$settings.myName} <br />
				{#if $settings.street && $settings.city && $settings.state && $settings.zip}
					{$settings.street} <br />
					{$settings.city}, {$settings.state}
					{$settings.zip}
				{/if}
			</p>
		{:else}
			<div class="center min-h-[68px] rounded bg-gallery">
				<a href="#" class="text-stone-600 underline hover:no-underline"
					>Add your contact information.
				</a>
			</div>
		{/if}
	</div>

	<div class="col-span-6 sm:col-span-3">
		<div class="label">Bill To:</div>
		<p>
			<strong>{data.invoice.client.name}</strong><br />
			{data.invoice.client.email}<br />
			{data.invoice.client.street} <br />
			{data.invoice.client.city}, {data.invoice.client.state}
			{data.invoice.client.zip}
		</p>
	</div>

	<div class="col-span-6 sm:col-span-2 sm:col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoice.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.invoice.dueDate)}</p>
	</div>

	<div class="col-span-3 sm:col-span-2 sm:col-start-5">
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
			<SvelteMarkdown source={data.invoice.notes} />
		</div>
	{/if}

	{#if data.invoice.terms}
		<div class="col-span-6">
			<div class="label">Terms and Conditions</div>
			<SvelteMarkdown source={data.invoice.terms} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>
