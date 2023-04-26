<script lang="ts">
	import { changeMindNameInStore } from '$lib/store/mindStore';
	import type Mind from '$lib/types/mind';

	export let mind: Mind;

	function nameChanged() {
		changeMindNameInStore(mind.id, mind.name);
	}
</script>

<label for={`${mind.id}-checkbox`} class="sr-only">Edit mind</label>
<input
	id={`${mind.id}-checkbox`}
	type="text"
	placeholder="Enter a mind"
	bind:value={mind.name}
	on:input={() => nameChanged()}
	class="input-text"
/>
