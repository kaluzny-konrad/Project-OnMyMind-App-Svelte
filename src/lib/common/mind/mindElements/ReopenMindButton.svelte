<script lang="ts">
	import { toggleCompleteInStore } from '../../../stores/mindStore';
	import type Mind from '../../../types/Mind';
	import ResetPath from '../../../icons/ResetPath.svelte';
	import Icon from '../../../icons/Icon.svelte';

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
	<span class="sr-only" data-testid="reopen-task">Reopen task</span>
	<Icon><ResetPath /></Icon>
</button>
