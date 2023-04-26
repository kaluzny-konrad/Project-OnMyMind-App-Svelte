<script lang="ts">
	import { addMindToStore } from '$lib/store/mindStore.js';
	import Icon from '$lib/common/elements/Icon.svelte';
	import AddPath from '$lib/common/iconPaths/AddPath.svelte';
	import TimeSum from '$lib/common/timer/TimeSum.svelte';

	function addMind() {
		const mindInput = document.getElementById(
			'mind-input',
		) as HTMLInputElement;
		const mind = mindInput.value;
		if (mind) {
			addMindToStore(mind);
			mindInput.value = '';
		}
	}
</script>

<div class="wide-component">
	<div class="wide-row">
		<label for="mind-input" class="sr-only">New mind</label>
		<input
			type="text"
			id="mind-input"
			placeholder="Enter a mind"
			class="input-text"
		/>
		<button
			type="button"
			on:click={addMind}
			class="round-button blue-button"
		>
			<Icon><AddPath /></Icon>
		</button>

		<TimeSum />
	</div>
</div>
