<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	import StartPath from '$lib/common/iconPaths/StartPath.svelte';
	import PausePath from '$lib/common/iconPaths/PausePath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';
	import StopPath from '../iconPaths/StopPath.svelte';

	const MAX_TIME = 15 * 60; // maksymalny czas w sekundach
	const INTERVAL_TIME = 1000; // co ile milisekund aktualizować czas

	let timer: NodeJS.Timer;
	$: intervalId = timer as unknown as number;
	$: remainingTime = MAX_TIME;
	$: isRunning = false;

	const timeLeft = writable(MAX_TIME);

	function tickTime() {
		remainingTime--;
		timeLeft.set(remainingTime);
		if (remainingTime === 0) {
			pauseTimer();
		}
	}

	function pauseTimer() {
		clearInterval(intervalId);
		isRunning = false;
	}

	function resetTimer() {
		pauseTimer();
		remainingTime = MAX_TIME;
		timeLeft.set(remainingTime);
	}

	function startTimer() {
		timer = setInterval(tickTime, INTERVAL_TIME);
		isRunning = true;
	}

	onDestroy(() => {
		pauseTimer();
	});

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
		{formatTime($timeLeft)}
	</div>
	<div class="flex justify-center space-x-4">
		{#if isRunning}
			<button
				class="round-button gray-button"
				on:click={pauseTimer}
			>
				<Icon>
					<PausePath />
				</Icon>
			</button>
			<button
				class="round-button red-button"
				on:click={resetTimer}
			>
				<Icon>
					<StopPath />
				</Icon>
			</button>
		{:else}
			<button
				class="round-button blue-button"
				on:click={startTimer}
			>
				<Icon>
					<StartPath />
				</Icon>
			</button>
		{/if}
	</div>
</div>
