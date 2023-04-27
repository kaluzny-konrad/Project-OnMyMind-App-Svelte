<script lang="ts">
	import { toggleCompleteInStore } from './mindStore';
	import type Mind from './mind';
	import ResetPath from './ResetPath.svelte';
	import Icon from './Icon.svelte';

	export let mind: Mind;

	function toggleComplete() {
		toggleCompleteInStore(mind.id);
	}
</script>

<button
	type="button"
	on:click={() => toggleComplete()}
	class="round-button gray-button"
>
	<span class="sr-only">Re-open</span>
	<Icon><ResetPath /></Icon>
</button>
