<script lang="ts">
	import { addMindToStore } from '$lib/store/mindStore.js';
    function addMind() {
        const mindInput = document.getElementById('mind-input') as HTMLInputElement;
        const mind = mindInput.value;
        if (mind) {
            addMindToStore(mind);
            mindInput.value = '';
        }
    }
</script>

<div class="flex justify-center items-center">
    <form on:submit|preventDefault={addMind} class="flex space-x-2">
        <input type="text" id="mind-input" placeholder="Enter a mind" class="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
        <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Add</button>
    </form>
</div>