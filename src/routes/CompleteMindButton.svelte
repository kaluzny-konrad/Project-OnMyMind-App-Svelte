<script lang="ts">
	import { toggleCompleteInStore } from './mindStore';
	import type Mind from './Mind';
	import CompletePath from './CompletePath.svelte';
	import Icon from '../lib/icons/Icon.svelte';
	import { stopTimerInStore } from './timerStore';

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
	<span class="sr-only">Complete</span>
	<Icon><CompletePath /></Icon>
</button>
