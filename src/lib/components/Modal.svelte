<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$lib/actions/ClickOutside';
	import Portal from './Portal.svelte';
	import Overlay from './Overlay.svelte';
	import CancelIcon from './Icon/CancelIcon.svelte';

	export let isVisible: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<!-- creates an event on the window on:keydown automatically gets the event and all the information -->
<!-- if the key pressed was the escape key, it will dispatch our 'close event'-->
<!-- this allows you to close the modal by pressing the escape key -->
<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('close');
		}
	}}
/>

{#if isVisible}
	<Portal>
		<Overlay className="!z-modalOverlay" />
		<div class="fixed inset-0 z-modal center">
			<div
				class="relative max-w-[450px] min-h-[230px] w-full rounded-lg bg-white px-10 py-7"
				use:clickOutside={() => {
					dispatch('close');
				}}
			>
				<button
					on:click={() => dispatch('close')}
					class="right-4 top-4 absolute text-pastelPurple hover:text-daisyBush"
				>
					<CancelIcon />
				</button>
				<slot />
			</div>
		</div>
	</Portal>
{/if}
