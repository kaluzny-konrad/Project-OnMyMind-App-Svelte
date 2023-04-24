<script lang="ts">
	import AddMindSection from '$lib/common/mind/addMindSection.svelte';
	import MindSection from '$lib/common/mind/mindSection.svelte';
</script>

<svelte:head>
	<title>OnMyMind</title>
	<meta
		name="description"
		content="An app to track multiple tasks running in parallel with Pomodoro rules and stat tracking."
	/>
</svelte:head>

<h1>OnMyMind</h1>
<div>
	<AddMindSection />
	<MindSection />
</div>