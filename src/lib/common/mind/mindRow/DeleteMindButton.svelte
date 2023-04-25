<script lang="ts">
	import { deleteMindFromStore } from '$lib/store/mindStore';
	import type Mind from '$lib/types/mind';
	import DeletePath from '$lib/common/iconPaths/DeletePath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';

	export let mind: Mind;

	function deleteMind() {
		deleteMindFromStore(mind.id);
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
