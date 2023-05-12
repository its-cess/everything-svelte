<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Arrow from '$lib/components/Icon/Arrow.svelte';

	let previousPage: string | undefined = undefined;

	//afterNavigate is a lifecycle function that takes a callback when the current component mounts
	//afterNavigate automatically receives the navigation object, from that object we can get the url from the page we were previously on
	afterNavigate((navigation) => {
		previousPage = navigation?.from?.url?.pathname;
	});
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			goto(previousPage || '/invoices');
		}
	}}
/>

<div class="bg-whisper h-full min-h-screen w-screen pt-16 lg:pt-12 pb-32">
	<main class="mx-auto max-w-screen-lg min-h-screen">
		<!-- previousPage comes from the afterNavigation callback. if it exists, send them to the prevoiusPage, if there is no previous page, send them to /invoices page -->
		<a
			href={previousPage ? previousPage : '/invoices'}
			class="fixed top-7 left-7 text-pastelPurple"
		>
			<Arrow />
		</a>
		<slot />
	</main>
</div>
