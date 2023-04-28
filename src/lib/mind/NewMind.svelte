<script lang="ts">
	import { addMindToStore } from './mindStore.js';
	import Icon from '../icons/Icon.svelte';
	import AddPath from '../icons/AddPath.svelte';
	import TimeSum from '../timer/TimeSum.svelte';
	import { addTimerToStore, startTimerInStore } from '../timer/timerStore';

	function addMind() {
		const mindInput = document.getElementById('mind-input') as HTMLInputElement;
		const mind = mindInput.value ?? '';
		let id = addMindToStore(mind);
		addTimerToStore(id);
		startTimerInStore(id);
		mindInput.value = '';
	}
</script>

<div class="wide-component">
	<div class="wide-component-title">Nowe zadanie</div>
	<div class="wide-row">
		<label for="mind-input" class="sr-only">Nowe zadanie</label>
		<input
			type="text"
			id="mind-input"
			placeholder="Teraz zajmę się..."
			class="input-text"
		/>
		<button type="button" on:click={addMind} class="round-button blue-button">
			<span class="sr-only">Dodaj zadanie</span>
			<Icon><AddPath /></Icon>
		</button>

		<TimeSum />
	</div>
</div>
