<script lang="ts">
	import { toggleCompleteInStore } from '../../stores/mindStore';
	import type Mind from '../../types/Mind';
	import CompletePath from '../../icons/CompletePath.svelte';
	import Icon from '../../icons/Icon.svelte';
	import { stopTimerInStore } from '../../stores/timerStore';

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
	<span class="sr-only">Complete task</span>
	<Icon><CompletePath /></Icon>
</button>
