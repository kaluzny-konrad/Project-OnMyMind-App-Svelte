<script lang="ts">
	import type Mind from '../../types/Mind';
	import { flip } from 'svelte/animate';
	import DeleteMindButton from './mindElements/DeleteMindButton.svelte';
	import CompleteMindButton from './mindElements/CompleteMindButton.svelte';
	import ReopenMindButton from './mindElements/ReopenMindButton.svelte';
	import EditMindInput from './mindElements/EditMindInput.svelte';
	import Timer from '../timer/Timer.svelte';

	export let minds: Mind[];
</script>

<ul class="wide-component">
	{#each minds as mind (mind.id)}
		<li
			class="wide-row {mind.isComplete ? 'completed' : 'active'}"
			data-testid="mind-row"
			animate:flip={{ duration: 200 }}
		>
			<EditMindInput {mind} />
			<Timer mindId={mind.id} active={!mind.isComplete} />
			{#if mind.isComplete}
				<div>
					{#if mind.completeDateTime}
						<p class="text-xs text-center font-semibold">{mind.completeDateTime.toLocaleString()}</p>
					{/if}
					<ReopenMindButton {mind} />
					<DeleteMindButton {mind} />
				</div>
			{:else}
				<CompleteMindButton {mind} />
			{/if}
		</li>
	{/each}
</ul>
