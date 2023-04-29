<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getTimersTimeElapsedSum } from './timerStore';
	import TimeVizualizer from './TimeVizualizer.svelte';

	$: time = 0;

	function refreshSum() {
		time = getTimersTimeElapsedSum();
	}

	let interval: NodeJS.Timer;

	onMount(() => {
		interval = setInterval(refreshSum, 1);
	});

	onDestroy(() => {
		clearInterval(interval as unknown as number);
	});
</script>

<TimeVizualizer {time} />
