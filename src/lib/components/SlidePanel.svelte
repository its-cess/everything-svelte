<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Portal from './Portal.svelte';
	import Overlay from './Overlay.svelte';
	import Arrow from './Icon/Arrow.svelte';

	const dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('close');
		}
	}}
/>

<Portal>
	<Overlay />
	<div
		class="fixed overflow-y-scroll bg-white w-full lg:w-3/4 h-screen px-5 pt-16 lg:py-20 lg:px-32 right-0 top-0 z-slidePanel shadow-slidePanel"
	>
		<button
			on:click={() => dispatch('closePanel')}
			class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
		>
			<Arrow />
		</button>
		<slot />
	</div>
</Portal>
