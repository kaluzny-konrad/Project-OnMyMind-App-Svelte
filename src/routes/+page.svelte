<script lang="ts">
	import AddMindSection from '$lib/common/mind/AddMindSection.svelte';
	import MindSection from '$lib/common/mind/MindSection.svelte';
</script>

<svelte:head>
	<title>OnMyMind</title>
	<meta
		name="description"
		content="An app to track multiple tasks running in parallel with Pomodoro rules and stat tracking."
	/>
</svelte:head>

<div>
	<AddMindSection />
	<MindSection />
</div>
