<script>
	import Mind from '$lib/common/mind/Mind.svelte';
	import { minds } from '$lib/store/mindStore';
	$: openMinds = $minds.filter((mind) => mind.isComplete === false);
	$: closedMinds = $minds.filter((mind) => mind.isComplete === true);
</script>

<div class="pt-4 text-center font-bold">Open Minds</div>
<div class="mt-2 space-y-4 max-w-5xl mx-auto px-2 lg:px-8">
	{#if openMinds.length === 0}
		<div class="text-center text-gray-500">No open minds</div>
	{:else}
		{#each openMinds as mind (mind.id)}
			<Mind {mind} />
		{/each}
	{/if}
</div>
<div class="pt-4 text-center font-bold">Closed Minds</div>
<div class="mt-2 space-y-4 max-w-5xl mx-auto px-2 lg:px-8">
	{#if closedMinds.length === 0}
		<div class="text-center text-gray-500">No closed minds</div>
	{:else}
		{#each closedMinds as mind (mind.id)}
			<Mind {mind} />
		{/each}
	{/if}
</div>
