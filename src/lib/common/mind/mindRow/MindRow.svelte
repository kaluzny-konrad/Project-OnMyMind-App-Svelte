<script lang="ts">
	import type Mind from '$lib/types/mind';
	import DeleteMindButton from './DeleteMindButton.svelte';
	import CompleteMindButton from './CompleteMindButton.svelte';
	import ReopenMindButton from './ReopenMindButton.svelte';
	import EditMindInput from './EditMindInput.svelte';
	import Timer from '$lib/common/timer/Timer.svelte';

	export let mind: Mind;
</script>

<div class="wide-component">
	<div class="wide-row">
		<EditMindInput {mind} />

		<Timer />

		{#if mind.isComplete}
			<ReopenMindButton {mind} />
		{:else}
			<CompleteMindButton {mind} />
		{/if}

		<DeleteMindButton {mind} />
	</div>
</div>
