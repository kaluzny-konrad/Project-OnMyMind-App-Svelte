<script lang="ts">
	import { deleteMindFromStore } from './mindStore';
	import type Mind from './mind';
	import DeletePath from './DeletePath.svelte';
	import Icon from './Icon.svelte';
	import { deleteTimerFromStore } from './timerStore';

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
	<span class="sr-only">Delete</span>
	<Icon><DeletePath /></Icon>
</button>
