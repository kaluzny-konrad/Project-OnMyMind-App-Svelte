<script lang="ts">
	import { changeMindNameInStore } from './mindStore';
	import type Mind from './Mind';

	export let mind: Mind;

	function nameChanged() {
		changeMindNameInStore(mind.id, mind.name);
	}
</script>

<label for={`${mind.id}-checkbox`} class="sr-only">Edit task</label>
<input
	id={`${mind.id}-checkbox`}
	type="text"
	placeholder="On my mind is..."
	bind:value={mind.name}
	on:input={() => nameChanged()}
	class="input-text"
/>
