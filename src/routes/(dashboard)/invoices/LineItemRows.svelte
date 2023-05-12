<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LineItemRow from './LineItemRow.svelte';
	import Button from '$lib/components/Button.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import {
		sumLineItems,
		centsToDollars,
		twoDecimals,
		addThousandsSeparator
	} from '$lib/utils/moneyHelpers';

	export let lineItems: LineItem[] | undefined = undefined;
	let dispatch = createEventDispatcher();

	let subtotal: string = '0.00';
	export let discount: number = 0;
	let discountedAmount: string = '0.00';
	let total: string = '0.00';
	export let isEditable = true;

	$: if (sumLineItems(lineItems) > 0) {
		subtotal = centsToDollars(sumLineItems(lineItems));
	}

	$: if (subtotal && discount) {
		discountedAmount = centsToDollars(sumLineItems(lineItems) * (discount / 100));
	}
	$: {
		//need to replace the commas with nothing, so that the total can be displayed properly. with commas, it displays as $NaN
		const plainSubtotal = subtotal.replace(',', '');
		total = addThousandsSeparator(twoDecimals(Number(plainSubtotal) - Number(discountedAmount)));
	}
</script>

<div class="invoice-line-item border-b-2 border-daisyBush pb-2">
	<div class="table-header">Description</div>
	<div class="table-header text-right">Unit Price</div>
	<div class="table-header text-center">Quantity</div>
	<div class="table-header text-right">Amount</div>
</div>

{#if lineItems}
	{#each lineItems as lineItem, index}
		<LineItemRow
			{lineItem}
			on:removeLineItem
			on:updateLineItem
			canDelete={index > 0}
			isRequired={index === 0}
			{isEditable}
		/>
	{/each}
{/if}

<div class="invoice-line-item">
	<div class="col-span-1 sm:col-span-2">
		{#if isEditable}
			<Button
				isAnimated={false}
				label="+ Line Item"
				style="textOnly"
				onClick={() => {
					dispatch('addLineItem');
				}}
			/>
		{/if}
	</div>
	<div class="font-bold py-5 text-right text-monsoon print:col-span-3">Subtotal:</div>
	<div class="py-5 text-right font-mono">${subtotal}</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-1 sm:col-span-2 text-right font-bold py-5 text-monsoon print:col-span-3">
		Discount:
	</div>
	<div class="relative">
		<input
			type="number"
			name="discount"
			min="0"
			max="100"
			disabled={!isEditable}
			bind:value={discount}
			on:change={() => {
				dispatch('updateDiscount', { discount });
			}}
			class="line-item h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right focus:border-solid focus:border-lavenderIndigo focus:outline-none print:pr-0"
		/>
		<span class="absolute right-0 top-2 text-mono">%</span>
	</div>
	<div class="py-5 text-right font-mono">${discountedAmount}</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-3 sm:col-span-6 print:col-span-6">
		<CircledAmount label="Total:" amount={`$${total}`} />
	</div>
</div>

<style lang="postcss">
	.table-header {
		@apply hidden text-sm font-bold text-daisyBush print:block sm:block;
	}
</style>
