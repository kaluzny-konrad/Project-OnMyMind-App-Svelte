<script lang="ts">
	import { addMindToStore } from '$lib/store/mindStore.js';
	import Icon from '$lib/common/elements/Icon.svelte';
	import AddPath from '$lib/common/iconPaths/AddPath.svelte';
	import TimeSum from '$lib/common/timer/TimeSum.svelte';
	import { addTimerToStore, startTimerInStore } from '$lib/store/timerStore';

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
	<div class="wide-component-title">Nowa sprawa</div>
	<div class="wide-row">
		<label for="mind-input" class="sr-only">Nowa sprawa</label>
		<input
			type="text"
			id="mind-input"
			placeholder="Teraz zajmę się..."
			class="input-text"
		/>
		<button type="button" on:click={addMind} class="round-button blue-button">
			<Icon><AddPath /></Icon>
		</button>

		<TimeSum />
	</div>
</div>
