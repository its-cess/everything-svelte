<script lang="ts">
	import Trash from '$lib/components/Icon/Trash.svelte';
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
	<div>
		<input type="text" name="description" class="line-item" />
	</div>

	<div>
		<input type="number" name="unitPrice" step="0.01" min="0" class="line-item text-right" />
	</div>

	<div>
		<input type="number" name="quanity" min="0" class="line-item text-center" />
	</div>

	<div>
		<input type="number" name="amount" step="0.01" min="0" class="line-item text-right" />
	</div>

	<div>
		<button class="center h-10 w-10 text-pastelPurple hover:bg-lavenderIndigo">
			<Trash />
		</button>
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
</style>
