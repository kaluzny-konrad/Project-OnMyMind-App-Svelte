<script lang="ts">
	import {
		deleteMindFromStore,
		toggleCompleteInStore,
		editMindInStore,
	} from '$lib/store/mindStore';

	import type Mind from '$lib/types/mind';

	import CompletePath from '$lib/common/iconPaths/CompletePath.svelte';
	import DeletePath from '$lib/common/iconPaths/DeletePath.svelte';
	import OpenPath from '$lib/common/iconPaths/OpenPath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';

	export let mind: Mind;

	function toggleComplete(id: string) {
		toggleCompleteInStore(id);
	}

	function editMind(id: string, target: EventTarget | null) {
		if (target) {
			var htmlTarget = target as HTMLInputElement;
			editMindInStore(id, htmlTarget.value);
		}
	}
</script>

<div class="wide-row">
	<label for={`${mind.id}-checkbox`} class="sr-only">Edit</label>
	<input
		id={`${mind.id}-checkbox`}
		type="text"
		placeholder="Enter a mind"
		value={mind.name}
		on:input={(e) => editMind(mind.id, e?.target)}
		class="input-text"
	/>

	{#if mind.isComplete}
		<button
			type="button"
			on:click={() => toggleComplete(mind.id)}
			class="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
		>
			<span class="sr-only">Open</span>
			<Icon><OpenPath /></Icon>
		</button>
	{:else}
		<button
			type="button"
			on:click={() => toggleComplete(mind.id)}
			class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
		>
			<span class="sr-only">Complete</span>
			<Icon><CompletePath /></Icon>
		</button>
	{/if}

	<button
		type="button"
		on:click={() => deleteMindFromStore(mind.id)}
		class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
	>
		<span class="sr-only">Delete</span>
		<Icon><DeletePath /></Icon>
	</button>
</div>
