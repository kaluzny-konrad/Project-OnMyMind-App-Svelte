<script lang="ts">
	import Timer from './Timer.svelte';

	function handleStart(event: CustomEvent) {
		console.log(event.detail.id);
	}
</script>

<Timer on:start={handleStart} />
<Timer on:start={handleStart} />
<Timer on:start={handleStart} />
