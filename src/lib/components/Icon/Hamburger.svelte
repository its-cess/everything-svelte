<script lang="ts">
	// width:  number = 24
	// tells ts that width should be a number, with a default value of 24.
	// adding the default value makes these props optional. if not provided, it will automatically set to default value.
	// shorthand is width = 24. setting the variable to the value of 24, ts knows it is a type number.
	export let width: number = 24,
		height: number = 24;
</script>

<svg {width} {height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M24 6.75008H0V5.25006H24V6.75008Z" />
	<path d="M24 12.7501H0V11.2501H24V12.7501Z" />
	<path d="M24 18.7502H0V17.2502H24V18.7502Z" />
</svg>
