<script lang="ts">
	import { changeMindNameInStore } from '../../stores/mindStore';
	import type Mind from '../../types/Mind';

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
	data-testid="edit-task"
	bind:value={mind.name}
	on:input={() => nameChanged()}
	class="input-text"
/>
