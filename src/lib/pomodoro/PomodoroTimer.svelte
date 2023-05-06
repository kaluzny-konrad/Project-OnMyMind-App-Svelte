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
	let interval: NodeJS.Timer;
	$: chosenTime = MAX_TIME;
	$: remainingTime = chosenTime;
	$: isRunning = false;

	onMount(() => {
		pomodoro = getPomodoroFromStore();
		interval = setInterval(refreshPomodoro, 1);
		audio = new Audio(audioUrl);
		audio.addEventListener('ended', () => resetAudio());
	});

	function addPomodoroToStoreIfNotExists() {
		return getPomodoroFromStore() ?? addPomodoroToStore(chosenTime);
	}

	function startPomodoro() {
		if (!pomodoro) resetAudio();
		pomodoro = addPomodoroToStoreIfNotExists();
		startPomodoroInStore();
	}

	function pausePomodoro() {
		stopPomodoroInStore();
	}

	function refreshPomodoro() {
		if (!pomodoro) return;
		const wasRunning = isRunning;
		isRunning = pomodoro.isRunning;
		remainingTime = pomodoro.getRemainingTime();
		if (remainingTime <= 0 && wasRunning) {
			audio.play();
			deletePomodoro();
		}
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
	});

	let audio: HTMLAudioElement;
	const audioUrl = '/sounds/alarm.mp3';
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
			min={60 * 5 * 1000}
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
