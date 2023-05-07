<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import Icon from '../icons/Icon.svelte';
	import StartPath from '../icons/StartPath.svelte';
	import PausePath from '../icons/PausePath.svelte';
	import ResetPath from '../icons/ResetPath.svelte';
	import TimeVizualizer from '../common/TimeVizualizer.svelte';

	import {
		addPomodoroToStore,
		deletePomodoroFromStore,
		getPomodoroFromStore,
		startPomodoroInStore,
		stopPomodoroInStore,
	} from './pomodoroStore';
	import type Pomodoro from './Pomodoro';

	const MAX_TIME = 15 * 60 * 1000;
	let pomodoro: Pomodoro | null = null;
	$: chosenTime = MAX_TIME;
	$: remainingTime = chosenTime;
	$: isRunning = false;
	let audio: HTMLAudioElement;
	const audioUrl = '/sounds/alarm.mp3';

	onMount(() => {
		pomodoro = getPomodoroFromStore();
		audio = new Audio(audioUrl);
		audio.volume = 0.1;
		audio.addEventListener('ended', () => resetAudio());
		requestAnimationFrame(updatePomodoro);
		addVisibilityChangeListener();
	});

	function addVisibilityChangeListener() {
		if (typeof window !== 'undefined') {
			document.addEventListener('visibilitychange', handleVisibilityChange);
		}
	}

	function addPomodoroToStoreIfNotExists() {
		return getPomodoroFromStore() ?? addPomodoroToStore(chosenTime);
	}

	function startPomodoro() {
		if (!pomodoro) resetAudio();
		pomodoro = addPomodoroToStoreIfNotExists();
		startPomodoroInStore();
		requestAnimationFrame(updatePomodoro);
	}

	function pausePomodoro() {
		stopPomodoroInStore();
		clearTimeoutWorker();
	}

	function updatePomodoro() {
		if (!pomodoro) return;
		const wasRunning = pomodoro.isRunning;
		isRunning = pomodoro.isRunning;
		remainingTime = pomodoro.getRemainingTime();

		if (remainingTime <= 0 && wasRunning) {
			endPomodoroSession();
		}

		if (isRunning) {
			requestAnimationFrame(updatePomodoro);
		}
	}

	function endPomodoroSession() {
		audio.play();
		clearTimeoutWorker();
		deletePomodoro();
	}

	function deletePomodoro() {
		remainingTime = chosenTime;
		deletePomodoroFromStore();
		pomodoro = null;
		isRunning = false;
	}

	function resetPomodoro() {
		deletePomodoro();
		resetAudio();
	}

	function resetAudio() {
		audio.pause();
		audio.currentTime = 0;
	}

	onDestroy(() => {
		pausePomodoro();
		if (typeof window !== 'undefined') {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		}
		clearTimeoutWorker();
	});

	function handleVisibilityChange() {
		if (document.hidden) {
			setTimeoutWorker();
		} else {
			clearTimeoutWorker();
		}
	}

	let timeoutWorker: Worker | null = null;
	function setTimeoutWorker() {
		if (pomodoro?.isRunning) {
			timeoutWorker = new Worker('/workers/timeoutWorker.js');
			timeoutWorker.postMessage({
				delay: remainingTime + 1000,
			});
			timeoutWorker.onmessage = () => {
				endPomodoroSession();
			};
		}
	}

	function clearTimeoutWorker() {
		if (timeoutWorker) {
			timeoutWorker.terminate();
			timeoutWorker = null;
		}
	}
</script>

<div class="wide-component">
	<div class="wide-row">
		<TimeVizualizer time={remainingTime} />

		{#if isRunning}
			<button class="round-button gray-button" on:click={pausePomodoro}>
				<span class="sr-only">Stop Pomodoro</span>
				<Icon>
					<PausePath />
				</Icon>
			</button>
		{:else}
			<button class="round-button blue-button" on:click={startPomodoro}>
				<span class="sr-only">Start Pomodoro</span>
				<Icon>
					<StartPath />
				</Icon>
			</button>
		{/if}
		<button class="round-button red-button" on:click={resetPomodoro}>
			<span class="sr-only">Restart Pomodoro</span>
			<Icon>
				<ResetPath />
			</Icon>
		</button>
		<input
			type="range"
			class="slider"
			id="pomodoroMaxTime"
			min={60 * 1 * 1000}
			max={45 * 60 * 1000}
			step={60 * 5 * 1000}
			bind:value={chosenTime}
			disabled={pomodoro != null}
		/>
		<label for="pomodoroMaxTime" class="sr-only"
			>{chosenTime / 60 / 1000} minutes</label
		>
	</div>
</div>
