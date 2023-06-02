<script lang="ts">
	import { deleteMindFromStore } from '../../../stores/mindStore';
	import type Mind from '../../../types/Mind';
	import DeletePath from '../../../icons/DeletePath.svelte';
	import Icon from '../../../icons/Icon.svelte';
	import { deleteTimerFromStore } from '../../../stores/timerStore';

	export let mind: Mind;

	function deleteMind() {
		deleteMindFromStore(mind.id);
		deleteTimerFromStore(mind.id);
	}
</script>

<button
	type="button"
	on:click={() => deleteMind()}
	class="round-button red-button"
>
	<span class="sr-only" data-testid="delete-task">Delete task</span>
	<Icon><DeletePath /></Icon>
</button>
