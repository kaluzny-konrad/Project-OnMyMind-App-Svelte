<script lang="ts">
	import {
		deleteMindFromStore,
		toggleCompleteInStore,
		editMindInStore
	} from '$lib/store/mindStore';
	import type Mind from '$lib/types/mind';
	import DeleteIcon from '../icon/deleteIcon.svelte';
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

<div class="flex justify-center items-center space-x-2">
	<label for={`${mind.id}-checkbox-complete`} class="sr-only">Complete</label>
	<input
		id={`${mind.id}-checkbox-complete`}
		type="checkbox"
		on:change={() => toggleComplete(mind.id)}
		class="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
		checked={mind.isComplete}
	/>
	<label for={`${mind.id}-checkbox`} class="sr-only">Edit</label>
	<input
		id={`${mind.id}-checkbox`}
		type="text"
		placeholder="Enter a mind"
		value={mind.name}
		on:input={(e) => editMind(mind.id, e?.target)}
		class="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent flex-grow"
	/>
	<button
		type="button"
		on:click={() => deleteMindFromStore(mind.id)}
		class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
	>
		<span class="sr-only">Delete</span>
		<DeleteIcon />
	</button>
</div>
