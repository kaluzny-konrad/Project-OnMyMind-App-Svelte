<script lang="ts">
	import { toggleCompleteInStore } from '$lib/store/mindStore';
	import type Mind from '$lib/types/mind';
	import ResetPath from '$lib/common/iconPaths/ResetPath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';

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
