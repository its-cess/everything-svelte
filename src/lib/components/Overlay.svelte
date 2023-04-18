<svelte:head>
	<!-- adding to svelte:head makes it so that this css is applied to the document head only when the Overlay component is available -->
	<!-- adding to svelte:head makes it so that this css is applied to the document head only when the Overlay component is available -->
	<style lang="postcss">
		body {
			@apply overflow-hidden;
		}
	</style>
</svelte:head>

<div class="fixed inset-0 bg-blueGem opacity-60 z-overlay" />
