<script lang="ts">
	import Snackbar from '$lib/components/Snackbar.svelte';
</script>

<Snackbar />
<div class="min-h-screen w-full bg-daisyBush md:bg-auth bg-center">
	<div
		class="h-screen w-full grid grid-cols-12 md:gap-5 auto-rows-min md:auto-rows-fr px-4 xl:px-0"
	>
		<div
			class="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-3 xl:col-span-3 xl:col-start-4 pt-8 md:my-auto"
		>
			<img src="/images/logo.svg" alt="The Dollar Holler" class="mx-auto" />
		</div>
		<div class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 md:my-auto">
			<slot />
		</div>
	</div>
</div>
