<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		addTimerToStore,
		startTimerInStore,
		stopTimerInStore,
		tickTimeInStore,
	} from '$lib/store/timerStore';
	import type Timer from '$lib/store/timerStore';
	import { writable } from 'svelte/store';

	let timer: Timer;
	let interval: NodeJS.Timer;
	$: isRunning = false;
	$: time = writable(0);

	onMount(() => {
		timer = addTimerToStore();
	});

	function startTimer() {
		startTimerInStore(timer.id);
		isRunning = timer.isRunning;
		interval = setInterval(tickTime, 1000);
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
