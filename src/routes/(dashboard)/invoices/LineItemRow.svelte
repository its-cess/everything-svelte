<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Trash from '$lib/components/Icon/Trash.svelte';
	import { twoDecimals, dollarsToCents } from '$lib/utils/moneyHelpers';

	export let lineItem: LineItem;
	export let canDelete: boolean = false;

	let unitPrice: string = twoDecimals(lineItem.amount / lineItem.quantity);
	let amount: string = twoDecimals(lineItem.amount);

	$: {
		amount = twoDecimals(lineItem.quantity * Number(unitPrice));
		lineItem.amount = dollarsToCents(Number(amount));
	}

	let dispatch = createEventDispatcher();
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
	<div>
		<input type="text" name="description" bind:value={lineItem.description} class="line-item" />
	</div>

	<div>
		<input
			type="number"
			name="unitPrice"
			bind:value={unitPrice}
			on:blur={() => {
				unitPrice = twoDecimals(Number(unitPrice));
				dispatch('updateLineItem');
			}}
			step="0.01"
			min="0"
			class="line-item text-right"
		/>
	</div>

	<div>
		<input
			type="number"
			name="quanity"
			bind:value={lineItem.quantity}
			on:blur={() => {
				dispatch('updateLineItem');
			}}
			min="0"
			class="line-item text-center"
		/>
	</div>

	<div>
		<input
			type="number"
			name="amount"
			bind:value={amount}
			step="0.01"
			min="0"
			class="line-item text-right"
			disabled
		/>
	</div>

	<div>
		{#if canDelete}
			<button
				on:click|preventDefault={() => {
					dispatch('removeLineItem', lineItem.id);
				}}
				class="center h-10 w-10 text-pastelPurple hover:bg-lavenderIndigo"
			>
				<Trash />
			</button>
		{/if}
	</div>
</div>

<style lang="postcss">
	input[type='text'],
	input[type='number'] {
		@apply h-10 w-full border-b-2 border-dashed border-stone-300;
	}

	input[type='text'] {
		@apply font-sansSerif text-xl font-bold;
	}

	input[type='number'] {
		@apply font-mono text-base;
	}

	input[type='text']:focus,
	input[type='number']:focus {
		@apply border-solid border-lavenderIndigo outline-none;
	}

	input[type='number']:disabled,
	input[type='text']:disabled {
		@apply border-b-0 bg-transparent px-0;
	}
</style>
