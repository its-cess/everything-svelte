<script>
	import BlankRow from '$lib/components/BlankRow.svelte';
	import ClientRowHeader from './ClientRowHeader.svelte';
</script>

<div>
	<div class="-mt-8 md:-mt-6 lg:-mt-14">
		<h2
			class="font-handwriting text-2xl md:text-4xl font-bold text-caribbeanGreen bg-arrowLeftUp md:bg-arrowRightUp bg-no-repeat bg-left md:bg-right pt-14 pl-24 md:pl-0 md:pr-28 text-left md:text-right mb-10"
		>
			Add Your First Client!
		</h2>
	</div>
	<ClientRowHeader className="text-fog" />
	<BlankRow />
	<BlankRow />
	<BlankRow />
</div>
