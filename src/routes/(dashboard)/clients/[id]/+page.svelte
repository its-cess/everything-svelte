<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
	import { isLate } from '$lib/utils/dateHelpers';

	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from '../../invoices/InvoiceRow.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
	import BlankState from '../../invoices/BlankState.svelte';
	import Button from '$lib/components/Button.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from '../ClientForm.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';

	export let data: { client: Client };
	console.log(data);

	let isClientFormShowing: boolean = false;
	let isEditingCurrentClient: boolean = false;

	onMount(() => {
		loadInvoices();
		console.log($invoices);
	});

	const editClient = () => {
		isEditingCurrentClient = true;
		isClientFormShowing = true;
	};

	const closePanel = () => {
		isClientFormShowing = false;
	};

	const getDraft = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
		const draftInvoices = data.client.invoices.filter(
			(invoice) => invoice.invoiceStatus === 'draft'
		);
		return centsToDollars(sumInvoices(draftInvoices));
	};

	const getPaid = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
		const paidInvoices = data.client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');
		return centsToDollars(sumInvoices(paidInvoices));
	};

	const getTotalOverdue = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
		const paidInvoices = data.client.invoices.filter(
			(invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)
		);
		return centsToDollars(sumInvoices(paidInvoices));
	};

	const getTotalOutstanding = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';
		const paidInvoices = data.client.invoices.filter(
			(invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)
		);
		return centsToDollars(sumInvoices(paidInvoices));
	};
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
	class="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-7 lg:mb-16 gap-y-6 md:gap-y-4"
>
	<!-- SEARCH FIELD -->
	{#if data.client.invoices && data.client.invoices.length > 0}
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

<div class="flex justify-between items-center w-full mb-7">
	<h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.client?.name}</h1>
	<Button label="Edit" isAnimated={false} style="textOnly" iconLeft={Edit} onClick={editClient} />
</div>

<div class="mb-10 grid grid-cols-1 lg:grid-cols-4 gap-4 rounded-lg bg-gallery py-7 px-10">
	<div class="summary-block">
		<div class="label">Total Overdue</div>
		<div class="number"><sup>$</sup>{getTotalOverdue()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Outstanding</div>
		<div class="number"><sup>$</sup>{getTotalOutstanding()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Draft</div>
		<div class="number"><sup>$</sup>{getDraft()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Paid</div>
		<div class="number"><sup>$</sup>{getPaid()}</div>
	</div>
</div>

<!-- INVOICE LIST -->
<div>
	<!-- invoices -->
	{#if data.client.invoices === null}
		Loading...
	{:else if data.client.invoices <= 0}
		<BlankState />
	{:else}
		<InvoiceRowHeader className="text-daisyBush" />
		<div class="flex flex-col-reverse">
			{#each data.client.invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices(data.client.invoices))}`} />
	{/if}
</div>

<!-- SLIDE PANEL -->
{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm
			{closePanel}
			formStatus={isEditingCurrentClient ? 'edit' : 'create'}
			client={isEditingCurrentClient ? data.client : undefined}
		/>
	</SlidePanel>
{/if}

<style lang="postcss">
	.summary-block {
		@apply text-center;
	}

	.label {
		@apply text-sm font-black text-[#a397ad];
	}

	sup {
		@apply relative -top-2;
	}

	.number {
		@apply truncate text-[2.5rem] font-black text-purple;
	}
</style>
