<script lang="ts">
	export let strokeWidth = 1.5;
</script>

<div class="w-6">
	<svg
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<slot />
	</svg>
</div>
