<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';

	import { clients, loadClients, addClient } from '$lib/stores/ClientStore';
	import { addInvoice, updateInvoice } from '$lib/stores/InvoiceStore';
	import { snackbar } from '$lib/stores/SnackbarStore';

	import { states } from '$lib/utils/states';
	import { today } from '$lib/utils/dateHelpers';

	import LineItemRows from './LineItemRows.svelte';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';

	const blankLineItem = {
		id: uuidv4(),
		description: '',
		quantity: 0,
		amount: 0
	};

	let isNewClient: boolean = false;

	export let invoice: Invoice = {
		client: {} as Client,
		lineItems: [{ ...blankLineItem }] as LineItem[]
	} as Invoice;

	let newClient: Partial<Client> = {};

	export let formState: 'create' | 'edit' = 'create';

	export let closePanel: () => void = () => {};

	let isModalShowing = false;

	const initialDiscount = invoice.discount || 0;

	const addLineItem = () => {
		invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
	};

	const removeLineItem = (event: CustomEvent) => {
		invoice.lineItems =
			invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
	};

	const updateLineItem = () => {
		invoice.lineItems = invoice.lineItems;
	};

	const updateDiscount = (event: CustomEvent) => {
		invoice.discount = event.detail.discount;
	};

	const handleSubmit = async () => {
		if (isNewClient) {
			invoice.client = newClient as Client;
			addClient(newClient as Client);
		}

		if (formState === 'create') {
			await addInvoice(invoice);
		} else {
			updateInvoice(invoice);
			snackbar.send({
				message: 'Your invoice was successfully updated.',
				type: 'success'
			});
		}

		closePanel();
	};

	onMount(() => {
		loadClients();
	});
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
	{#if formState === 'create'} Add {:else} Edit {/if} an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
	<!-- CLIENT INFO -->
	<div class="field col-span-6 md:col-span-4">
		{#if !isNewClient}
			<label for="client">Client</label>
			<div class="flex items-end gap-x-2 md:gap-x-5 flex-wrap sm:flex-nowrap">
				<select
					class="mb-2 sm:mb-0"
					name="client"
					id="client"
					required={!isNewClient}
					bind:value={invoice.client.id}
					on:change={() => {
						const selectedClient = $clients.find((client) => client.id === invoice.client.id);
						invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : '';
					}}
				>
					<option />
					{#each $clients as client}
						<option value={client.id}>{client.name}</option>
					{/each}
				</select>
				<div class="text-base font-bold text-monsoon leading-[2.25rem] lg:leading-[3.5rem]">or</div>
				<Button
					label="+ Client"
					style="outline"
					isAnimated={false}
					onClick={() => {
						isNewClient = true;
						invoice.client.name = '';
						invoice.client.email = '';
					}}
				/>
			</div>
		{:else}
			<label for="newClient">New Client</label>
			<div class="flex items-end gap-x-2 md:gap-x-5 flex-wrap sm:flex-nowrap">
				<input
					type="text"
					class="mb-2 sm:mb-0"
					name="newClient"
					required={isNewClient}
					bind:value={newClient.name}
				/>
				<div class="text-base font-bold text-monsoon leading-[2.25rem] lg:leading-[3.5rem]">or</div>
				<Button
					label="Existing Client"
					style="outline"
					isAnimated={false}
					onClick={() => {
						isNewClient = false;
						newClient = {};
					}}
				/>
			</div>
		{/if}
	</div>

	<!-- INVOICE ID -->
	<div class="field row-start-1 md:row-start-auto col-span-6 md:col-span-2">
		<label for="invoiceNumber">Invoice ID</label>
		<input type="number" name="invoiceNumber" required bind:value={invoice.invoiceNumber} />
	</div>

	<!-- NEW CLIENT -->
	{#if isNewClient}
		<div class="field grid col-span-6 gap-x-5" transition:slide>
			<div class="field col-span-6">
				<label for="email">Client's Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required={isNewClient}
					bind:value={newClient.email}
				/>
			</div>

			<div class="field col-span-6">
				<label for="street">Street</label>
				<input type="text" name="street" id="street" bind:value={newClient.street} />
			</div>

			<div class="field col-span-2">
				<label for="city">City</label>
				<input type="text" name="city" id="city" bind:value={newClient.city} />
			</div>

			<div class="field col-span-2">
				<label for="state">State</label>
				<select name="state" id="state" bind:value={newClient.state}>
					<option />
					{#each states as state}
						<option value={state.value}>{state.name}</option>
					{/each}
				</select>
			</div>

			<div class="field col-span-2">
				<label for="zip">Zip</label>
				<input type="text" name="zip" id="zip" bind:value={newClient.zip} />
			</div>
		</div>
	{/if}

	<!-- DUE DATE -->
	<div class="field col-span-3 sm:col-span-2">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" min={today} required bind:value={invoice.dueDate} />
	</div>

	<!-- ISSUE DATE -->
	<div class="field col-span-3 sm:col-span-2 md:col-start-5">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" min={today} bind:value={invoice.issueDate} />
	</div>

	<!-- SUBJECT -->
	<div class="field col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" bind:value={invoice.subject} />
	</div>

	<!-- LINE ITEMS -->
	<div class="field col-span-6">
		<LineItemRows
			lineItems={invoice.lineItems}
			discount={invoice.discount}
			on:addLineItem={addLineItem}
			on:removeLineItem={removeLineItem}
			on:updateLineItem={updateLineItem}
			on:updateDiscount={updateDiscount}
		/>
	</div>

	<!-- NOTES -->
	<div class="field col-span-6">
		<label for="notes">Notes<span class="font-normal">(optional, displayed on invoice)</span></label
		>
		<textarea name="notes" id="notes" bind:value={invoice.notes} />
	</div>

	<!-- TERMS -->
	<div class="field col-span-6">
		<label for="terms"
			>Terms<span class="font-normal">(optional, enter your terms and conditions)</span></label
		>
		<textarea name="terms" id="terms" bind:value={invoice.terms} />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
		</div>
	</div>

	<!-- BUTTONS -->
	<div class="field col-span-2">
		<!-- only be visible if editing-->
		{#if formState === 'edit'}
			<Button
				label="Delete"
				style="textOnlyDestructive"
				isAnimated={false}
				onClick={() => {
					isModalShowing = true;
				}}
				iconLeft={Trash}
			/>
		{/if}
	</div>
	<div class="field col-span-4 flex justify-end gap-x-5">
		<Button label="Cancel" style="secondary" isAnimated={false} onClick={closePanel} />
		<button
			type="submit"
			class="bg-lavenderIndigo text-white button translate-y-0 shadow-colored transition-all hover:-translate-y-2 hover:shadow-coloredHover"
			>Save</button
		>
	</div>
</form>

<!-- CONFIRM DELETE MODAL -->
<ConfirmDelete
	{invoice}
	{isModalShowing}
	on:close={() => {
		isModalShowing = false;
		closePanel();
	}}
/>
