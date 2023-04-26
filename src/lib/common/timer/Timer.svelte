<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		getTimerFromStore,
		addTimerToStore,
		startTimerInStore,
		stopTimerInStore,
		tickTimeInStore,
	} from '$lib/store/timerStore';
	import type Timer from '$lib/store/timerStore';
	import { writable } from 'svelte/store';

	import StartPath from '$lib/common/iconPaths/StartPath.svelte';
	import PausePath from '$lib/common/iconPaths/PausePath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';
	import TimeVizualizer from './TimeVizualizer.svelte';

	let timer: Timer;
	let interval: NodeJS.Timer;
	$: isRunning = false;
	$: time = writable(0);

	onMount(() => {
		timer = addTimerToStore();
	});

	function startTimer() {
		startTimerInStore(timer.id);
		isRunning = true;
		interval = setInterval(tickTime, 1000);
	}

	function pauseTimer() {
		stopTimerInStore(timer.id);
		isRunning = false;
		clearInterval(interval as unknown as number);
	}

	function tickTime() {
		isRunning = timer.isRunning;
		if (!isRunning) pauseTimer();
		tickTimeInStore(timer.id);
		time.update(() => timer.time);
	}

	onDestroy(() => {
		if (timer?.id) stopTimerInStore(timer.id);
	});
</script>

<div
	class="flex items-center justify-center space-x-4 text-center"
>
	<TimeVizualizer time={$time} />
	{#if isRunning}
		<button
			class="round-button gray-button"
			on:click={pauseTimer}
			><Icon>
				<PausePath />
			</Icon></button
		>
	{:else}
		<button
			class="round-button blue-button"
			on:click={startTimer}
			><Icon>
				<StartPath />
			</Icon></button
		>
	{/if}
</div>
