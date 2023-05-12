<script lang="ts">
	export let size = 30;
	export let color = '#ffffff';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={color}
>
	<slot />
</svg>
