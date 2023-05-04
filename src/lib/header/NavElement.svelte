<script lang="ts">
	export let href: string;
	export let name: string;
</script>

{#if href && name}
	<a class="text-link font-bold" {href}>
		<div
			class="border-b-2 border-transparent p-6 transition-all duration-500 hover:border-gray-800"
		>
			{name}
		</div>
	</a>
{/if}
