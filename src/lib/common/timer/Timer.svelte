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
	import { createEventDispatcher } from 'svelte';

	let timer: Timer;
	let interval: NodeJS.Timer;
	$: isRunning = false;
	$: time = writable(0);

	const dispatch = createEventDispatcher();

	onMount(() => {
		timer = addTimerToStore();
	});

	function startTimer() {
		startTimerInStore(timer.id);
		isRunning = timer.isRunning;
		interval = setInterval(tickTime, 1000);
		dispatch('start', { id: timer.id });
	}

	function pauseTimer() {
		stopTimerInStore(timer.id);
		isRunning = timer.isRunning;
		clearInterval(interval as unknown as number);
	}

	onDestroy(() => {
		if (timer?.id) stopTimerInStore(timer.id);
	});

	function tickTime() {
		timer = getTimerFromStore(timer.id);
		isRunning = timer.isRunning;
		if (!isRunning) pauseTimer();
		tickTimeInStore(timer.id);
		time.update(() => timer.time);
	}

	function formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = time - minutes * 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	}
</script>

<div class="text-center">
	<div class="mb-4 text-4xl font-bold">
		{formatTime($time)}
	</div>
	{#if isRunning}
		<button on:click={pauseTimer}>Stop</button>
	{:else}
		<button on:click={startTimer}>Start</button>
	{/if}
</div>
