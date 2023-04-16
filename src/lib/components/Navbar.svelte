<script lang="ts">
	import { page } from '$app/stores';
	import Close from './Icon/Close.svelte';
	import Hamburger from './Icon/Hamburger.svelte';

	// let isNavShowing: boolean = false
	// if you set a variable to true or false, ts automatically knows it is a boolean, and you don't have to explicity set it and give it a default value.
	let isNavShowing = false;
</script>

<!-- svelte:head injects meta data into our document -->
<svelte:head>
	<!-- stops the nav from scrolling on small screens. on md+ screens, overflow is auto and will scroll -->
	{#if isNavShowing}
		<style lang="postcss">
			body {
				@apply overflow-hidden md:overflow-auto;
			}
		</style>
	{/if}
</svelte:head>

<!-- MOBILE NAV CONTROL -->
<button
	class="fixed right-6 top-6 z-navBarToggle md:hidden"
	class:text-goldenFizz={isNavShowing}
	class:text-daisyBush={!isNavShowing}
	on:click={() => {
		isNavShowing = !isNavShowing;
	}}
>
	<!-- svelte conditional rendering -->
	<!-- if isNavShowing is true, show: -->
	{#if isNavShowing}
		<Close width={32} height={32} />
	{:else}
		<!-- else show this:-->
		<Hamburger width={32} height={32} />
		<!-- close the if block -->
	{/if}
</button>

<!-- when isNavShowing is true, we want the class:translate-x-0 to be applied -->
<header
	class="fixed z-navBar md:relative w-full h-screen md:h-full -translate-x-full md:translate-x-0 transition-transform md:col-span-3 bg-daisyBush text-center"
	class:translate-x-0={isNavShowing}
>
	<div class="mt-10 mb-10 md:mb-24">
		<a href="/invoices">
			<img src="/images/logo.svg" alt="The Dollar Holler" class="mx-auto" />
		</a>
	</div>

	<nav>
		<ul class="list-none text-2xl font-bold">
			<!-- apply the active class when our page.url.pathname is the page we are on -->
			<!-- page.url.pathname is provided by svelte out of the box -->
			<li><a href="/invoices" class:active={$page.url.pathname === '/invoices'}>Invoices</a></li>
			<li><a href="/clients" class:active={$page.url.pathname === '/clients'}>Clients</a></li>
			<li><a href="#">Settings</a></li>
			<li><a href="#">Logout</a></li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	nav ul li {
		@apply mb-6;
	}

	nav ul li a {
		@apply font-bold text-white hover:text-goldenFizz;
	}

	nav ul li a.active {
		@apply px-8 text-robinEggBlue transition-[padding];
		background: url('/images/active-nav--left.svg') left top no-repeat,
			url('/images/active-nav--right.svg') right top no-repeat;
	}

	nav ul li a.active:hover {
		@apply px-9;
	}
</style>
