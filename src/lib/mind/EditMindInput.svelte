<script lang="ts">
	import { changeMindNameInStore } from './mindStore';
	import type Mind from './Mind';

	export let mind: Mind;

	function nameChanged() {
		changeMindNameInStore(mind.id, mind.name);
	}
</script>

<label for={`${mind.id}-checkbox`} class="sr-only">Edytuj zadanie</label>
<input
	id={`${mind.id}-checkbox`}
	type="text"
	placeholder="Zajmuje się..."
	bind:value={mind.name}
	on:input={() => nameChanged()}
	class="input-text"
/>
