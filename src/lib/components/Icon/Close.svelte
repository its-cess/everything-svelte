<script lang="ts">
	// width:  number = 24
	// tells ts that width should be a number, with a default value of 24.
	// adding the default value makes these props optional. if not provided, it will automatically set to default value.
	// shorthand is width = 24. setting the variable to the value of 24, ts knows it is a type number.
	export let width: number = 24,
		height: number = 24;
</script>

<svg {width} {height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
	/>
</svg>
