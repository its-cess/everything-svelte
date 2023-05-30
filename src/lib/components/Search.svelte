<script lang="ts">
	import SearchIcon from '$lib/components/Icon/SearchIcon.svelte';
</script>

<div class="relative flex w-full items-baseline">
	<div class="mr-2 mt-auto text-pastelPurple">
		<SearchIcon />
	</div>
	<input
		type="text"
		name="search"
		placeholder="Search by keyword"
		class="search w-full pr-[80px] md:pr-0 md:w-[14rem] lg:w-72 border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base lg:text-xl text-black outline-none focus:border-b-lavenderIndigo focus:border-solid"
	/>
	<button
		class="pointer-events-none transform transition-transform absolute left-8 font-sansSerif text-base lg:text-xl font-black text-pastelPurple"
		>Search</button
	>
</div>

<style lang="postcss">
	/* SEARCH INPUT ANIMATIONS: */
	::placeholder {
		color: transparent;
	}
	input:not(:placeholder-shown) + button,
	input:focus + button {
		@apply pointer-events-auto left-auto right-0 translate-x-[calc(100%-65px)] text-right text-lavenderIndigo md:left-0 md:right-auto md:translate-x-[16rem] lg:translate-x-80;
	}

	input + button:focus,
	input:focus + button:hover {
		@apply text-daisyBush;
	}
</style>
