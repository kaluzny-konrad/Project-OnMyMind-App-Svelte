<script lang="ts">
	import { toggleCompleteInStore } from '$lib/store/mindStore';
	import type Mind from '$lib/types/mind';
	import CompletePath from '$lib/common/iconPaths/CompletePath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';

	export let mind: Mind;

	function toggleComplete() {
		toggleCompleteInStore(mind.id);
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
