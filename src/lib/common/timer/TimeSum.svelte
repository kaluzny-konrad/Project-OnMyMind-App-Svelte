<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getActiveTimers } from '$lib/store/timerStore';
	import TimeVizualizer from './TimeVizualizer.svelte';

	$: time = 0;

	function refreshSum() {
		time += getActiveTimers();
	}

	let interval: NodeJS.Timer;

	onMount(() => {
		interval = setInterval(refreshSum, 1000);
	});

	onDestroy(() => {
		clearInterval(interval as unknown as number);
	});
</script>

<TimeVizualizer {time} />
