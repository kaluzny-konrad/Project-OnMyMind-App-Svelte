<script lang="ts">
	import { addMindToStore } from '../../stores/mindStore.js';
	import Icon from '../../icons/Icon.svelte';
	import AddPath from '../../icons/AddPath.svelte';
	import TimeSum from '../timer/TimeSum.svelte';
	import { addTimerToStore, startTimerInStore } from '../../stores/timerStore';

	function addMind() {
		const mindInput = document.getElementById('mind-input') as HTMLInputElement;
		const mind = mindInput.value ?? '';
		let id = addMindToStore(mind);
		addTimerToStore(id);
		startTimerInStore(id);
		mindInput.value = '';
	}

	function keydownOnInput(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addMind();
		}
	}
</script>

<div class="wide-component">
	<div class="wide-row">
		<label for="mind-input" class="sr-only">New task</label>
		<input
			type="text"
			id="mind-input"
			on:keydown={keydownOnInput}
			placeholder="On my mind is..."
			class="input-text"
		/>
		<button type="button" on:click={addMind} class="round-button blue-button">
			<span class="sr-only">Add task</span>
			<Icon><AddPath /></Icon>
		</button>

		<TimeSum />
	</div>
</div>
