<script lang="ts">
	import {
		deleteMindFromStore,
		toggleCompleteInStore,
		editMindInStore
	} from '$lib/store/mindStore';
	import type Mind from '$lib/types/mind';
	import CompleteIcon from '$lib/common/icon/CompleteIcon.svelte';
	import DeleteIcon from '$lib/common/icon/DeleteIcon.svelte';
	import OpenIcon from '$lib/common/icon/OpenIcon.svelte';
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

	$: completeClass = mind.isComplete ? 'bg-green-300' : '';
</script>

<div class="flex justify-center items-center space-x-2">
	<label for={`${mind.id}-checkbox`} class="sr-only">Edit</label>
	<input
		id={`${mind.id}-checkbox`}
		type="text"
		placeholder="Enter a mind"
		value={mind.name}
		on:input={(e) => editMind(mind.id, e?.target)}
		class="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent flex-grow"
	/>

	{#if mind.isComplete}
		<button
			type="button"
			on:click={() => toggleComplete(mind.id)}
			class="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
		>
			<span class="sr-only">Open</span>
			<OpenIcon />
		</button>
	{:else}
		<button
			type="button"
			on:click={() => toggleComplete(mind.id)}
			class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
		>
			<span class="sr-only">Complete</span>
			<CompleteIcon />
		</button>
		
	{/if}

	<button
		type="button"
		on:click={() => deleteMindFromStore(mind.id)}
		class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
	>
		<span class="sr-only">Delete</span>
		<DeleteIcon />
	</button>
</div>
