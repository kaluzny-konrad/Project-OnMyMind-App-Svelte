<script lang="ts">
	import { toggleCompleteInStore } from './mindStore';
	import type Mind from './Mind';
	import CompletePath from '../icons/CompletePath.svelte';
	import Icon from '../icons/Icon.svelte';
	import { stopTimerInStore } from '../timer/timerStore';

	export let mind: Mind;

	function toggleComplete() {
		toggleCompleteInStore(mind.id);
		stopTimerInStore(mind.id);
	}
</script>

<button
	type="button"
	on:click={() => toggleComplete()}
	class="round-button green-button"
>
	<span class="sr-only">Ukończ zadanie</span>
	<Icon><CompletePath /></Icon>
</button>
