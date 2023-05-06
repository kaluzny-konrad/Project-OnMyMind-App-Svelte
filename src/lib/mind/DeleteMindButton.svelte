<script lang="ts">
	import { deleteMindFromStore } from './mindStore';
	import type Mind from './Mind';
	import DeletePath from '../icons/DeletePath.svelte';
	import Icon from '../icons/Icon.svelte';
	import { deleteTimerFromStore } from '../timer/timerStore';

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
	<span class="sr-only">Delete task</span>
	<Icon><DeletePath /></Icon>
</button>
