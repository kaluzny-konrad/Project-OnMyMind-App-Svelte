<script lang="ts">
	import type Mind from '../../types/Mind';
	import DeleteMindButton from './DeleteMindButton.svelte';
	import CompleteMindButton from './CompleteMindButton.svelte';
	import ReopenMindButton from './ReopenMindButton.svelte';
	import EditMindInput from './EditMindInput.svelte';
	import Timer from '../timer/Timer.svelte';

	export let mind: Mind;
</script>

<div class="wide-component" data-testid="mind-row">
	<div class="wide-row">
		<EditMindInput {mind} />
		<Timer mindId={mind.id} active={!mind.isComplete} />
		{#if mind.isComplete}
			<ReopenMindButton {mind} />
			<DeleteMindButton {mind} />
		{:else}
			<CompleteMindButton {mind} />
		{/if}
	</div>
</div>
