<script lang="ts">
	import type Mind from '$lib/types/mind';
	import MindRow from './mindRow/MindRow.svelte';

	export let minds: Mind[];
	export let title: string;
</script>

{#if minds.length > 0}
	<div class="wide-component-title">{title}</div>
	{#each minds as mind (mind.id)}
		<MindRow {mind} />
	{/each}
{/if}
