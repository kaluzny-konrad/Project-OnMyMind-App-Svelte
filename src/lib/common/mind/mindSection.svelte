<script>
    import Mind from "$lib/common/mind/mind.svelte";
    import { minds } from '$lib/store/mindStore';
</script>

<section class="mt-8 mx-4 space-y-4">
	{#each $minds as mind (mind.id)}
		<Mind {mind} />
	{/each}
</section>