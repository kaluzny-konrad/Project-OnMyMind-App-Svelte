<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	import StartPath from '$lib/common/iconPaths/StartPath.svelte';
	import PausePath from '$lib/common/iconPaths/PausePath.svelte';
	import ResetPath from '$lib/common/iconPaths/ResetPath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';

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
	<div class="mb-4 text-4xl font-bold">{formatTime($timeLeft)}</div>
	<div class="flex justify-center space-x-4">
		{#if isRunning}
			<button
				class="py-2 px-4 text-white bg-red-500 rounded hover:bg-red-600"
				on:click={pauseTimer}
			>
				<Icon><PausePath /></Icon>
			</button>
		{:else}
			<button
				class="py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
				on:click={startTimer}
			>
				<Icon><StartPath /></Icon>
			</button>
		{/if}

		<button
			class="py-2 px-4 text-white bg-gray-500 rounded hover:bg-gray-600"
			on:click={resetTimer}
		>
			<Icon><ResetPath /></Icon>
		</button>
	</div>
</div>
