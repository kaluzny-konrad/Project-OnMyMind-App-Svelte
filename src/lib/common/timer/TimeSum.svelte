<script lang="ts">
	import { onMount } from 'svelte';
	import { getTimersTimeElapsedSum } from '../../stores/timerStore';
	import TimeVizualizer from './TimeVizualizer.svelte';

	$: time = 0;

	function refreshSum() {
		time = getTimersTimeElapsedSum();
		requestAnimationFrame(refreshSum);
	}

	onMount(() => {
		requestAnimationFrame(refreshSum);
	});
</script>

<TimeVizualizer {time} />
