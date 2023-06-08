<script lang="ts">
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
	import { clickOutside } from '$lib/actions/ClickOutside';
	import { swipe } from '$lib/actions/Swipe';

	import Tag from '$lib/components/Tag.svelte';
	import View from '$lib/components/Icon/View.svelte';
	import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import CancelIcon from '$lib/components/Icon/CancelIcon.svelte';
	import Edit from '$lib/components/Icon/Edit.svelte';
	import Activate from '$lib/components/Icon/Activate.svelte';
	import Archive from '$lib/components/Icon/Archive.svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';

	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from './ClientForm.svelte';

	export let client: Client;
	let triggerReset = false;

	let isAdditionalMenuShowing = false;

	let isClientFormShowing = false;

	const closePanel = () => {
		isClientFormShowing = false;
	};

	const receivedInvoices = () => {
		if (client?.invoice) {
			//find invoices that have been paid
			const paidInvoices = client.invoice?.filter((invoice) => invoice.invoiceStatus === 'paid');
			//get the sum of all the invoices that have been paid
			return sumInvoices(paidInvoices);
		}
		return 0;
	};

	const balanceInvoices = () => {
		if (client?.invoice) {
			//find invoices that have NOT been paid
			const paidInvoices = client.invoice?.filter((invoice) => invoice.invoiceStatus !== 'paid');
			//get the sum of all the invoices that have been paid
			return sumInvoices(paidInvoices);
		}
		return 0;
	};

	const handleEdit = () => {
		isClientFormShowing = true;
		isAdditionalMenuShowing = false;
	};

	const handleActivteClient = () => {
		client.clientStatus = 'active';
		isAdditionalMenuShowing = false;
	};

	const handleArchiveClient = () => {
		client.clientStatus = 'archive';
		isAdditionalMenuShowing = false;
	};

	const handleDeleteClient = () => {
		console.log('deleting');
	};
</script>

<div class="relative">
	<div
		use:swipe={{ triggerReset }}
		on:outOfView={() => {
			triggerReset = false;
		}}
		class="client-table client-row rounded-lg bg-white py-3 lg:py-6 shadow-tableRow z-row relative"
	>
		<div class="status"><Tag className="ml-auto" label={client.clientStatus} /></div>
		<div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
			{client.name}
		</div>
		<div class="received text-right font-mono text-sm lg:text-lg font-bold">
			${centsToDollars(receivedInvoices())}
		</div>
		<div class="balance text-right font-mono text-sm lg:text-lg font-bold text-scarlet">
			${centsToDollars(balanceInvoices())}
		</div>
		<div
			class="view relative hidden lg:flex justify-center items-center text-pastelPurple hover:text-daisyBush"
		>
			<a href={`/clients/${client.id}`}><View /></a>
		</div>
		<div
			class="three-dots relative hidden lg:flex justify-center items-center"
			use:clickOutside={() => {
				isAdditionalMenuShowing = false;
			}}
		>
			<button
				class="text-pastelPurple hover:text-daisyBush"
				on:click={() => {
					isAdditionalMenuShowing = !isAdditionalMenuShowing;
				}}
			>
				<ThreeDots />
			</button>
			{#if isAdditionalMenuShowing}
				<AdditionalOptions
					options={[
						{ label: 'Edit', icon: Edit, onClick: handleEdit, disabled: false },
						{
							label: 'Activate',
							icon: Activate,
							onClick: handleActivteClient,
							disabled: client.clientStatus === 'active'
						},
						{
							label: 'Archive',
							icon: Archive,
							onClick: handleArchiveClient,
							disabled: client.clientStatus === 'archive'
						},
						{ label: 'Delete', icon: Trash, onClick: handleDeleteClient, disabled: false }
					]}
				/>
			{/if}
		</div>
	</div>

	<!-- swipe to reveal -->
	<div class="swipe-revealed-actions">
		<button
			class="action-button"
			on:click={() => {
				triggerReset = true;
			}}
		>
			<CancelIcon width={32} height={32} />
			Cancel
		</button>

		<button class="action-button" on:click={handleEdit}>
			<Edit width={32} height={32} />
			Edit
		</button>

		{#if client.clientStatus === 'active'}
			<button class="action-button" on:click={handleArchiveClient}>
				<Archive width={32} height={32} />
				Archive
			</button>
		{/if}

		{#if client.clientStatus === 'archive'}
			<button class="action-button" on:click={handleActivteClient}>
				<Activate width={32} height={32} />
				Activate
			</button>
		{/if}

		<button class="action-button" on:click={handleDeleteClient}>
			<Trash width={32} height={32} />
			Delete
		</button>
		<a href={`/clients/${client.id}`} class="action-button">
			<View width={32} height={32} />
			View
		</a>
	</div>
</div>

{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm {closePanel} formStatus="edit" {client} />
	</SlidePanel>
{/if}

<style lang="postcss">
	.client-row {
		grid-template-areas:
			'clientName status'
			'received balance';
	}

	@media (min-width: 1024px) {
		.client-row {
			grid-template-areas: 'status clientName received balance view threeDots';
		}
	}

	.client-name {
		grid-area: clientName;
	}
	.status {
		grid-area: status;
	}
	.received {
		@apply text-left lg:text-right;
		grid-area: received;
	}

	.received:before {
		@apply block text-xs font-bold lg:hidden;
		content: 'Received: ';
	}

	.balance {
		grid-area: balance;
	}

	.balance:before {
		@apply block text-xs font-bold lg:hidden;
		content: 'Balance: ';
	}
</style>
