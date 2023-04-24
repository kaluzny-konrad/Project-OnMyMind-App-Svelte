<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import StartIcon from '../icon/StartIcon.svelte';
	import PauseIcon from '../icon/PauseIcon.svelte';
	import ResetIcon from '../icon/ResetIcon.svelte';

	const MAX_TIME = 15 * 60; // maksymalny czas w sekundach
	const INTERVAL_TIME = 1000; // co ile milisekund aktualizować czas

	let timer: NodeJS.Timer;
	$: intervalId = timer as unknown as number;
	let remainingTime = MAX_TIME;
	$: isRunning = false;

	// ustawiamy wartość początkową licznika czasu na 15 minut
	const timeLeft = writable(MAX_TIME);

	// funkcja, która będzie wywoływana co sekundę
	function tickTime() {
		remainingTime--;
		timeLeft.set(remainingTime);
		if (remainingTime === 0) {
			pauseTimer();
		}
	}

	// funkcja zatrzymująca timer
	function pauseTimer() {
		clearInterval(intervalId);
		isRunning = false;
	}

	// funkcja resetująca timer
	function resetTimer() {
		pauseTimer();
		remainingTime = MAX_TIME;
		timeLeft.set(remainingTime);
	}

	// funkcja uruchamiająca timer
	function startTimer() {
		timer = setInterval(tickTime, INTERVAL_TIME);
		isRunning = true;
	}

	onMount(() => {
		// uruchamiamy timer przy pierwszym renderowaniu
		startTimer();
	});

	onDestroy(() => {
		// zatrzymujemy timer przy zniszczeniu komponentu
		pauseTimer();
	});

	// formatujemy pozostały czas jako string "MM:SS"
	function formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = time - minutes * 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
				<PauseIcon />
			</button>
		{:else}
			<button
				class="py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
				on:click={startTimer}
			>
				<StartIcon />
			</button>
		{/if}

		<button
			class="py-2 px-4 text-white bg-gray-500 rounded hover:bg-gray-600"
			on:click={resetTimer}
		>
			<ResetIcon />
		</button>
	</div>
</div>
