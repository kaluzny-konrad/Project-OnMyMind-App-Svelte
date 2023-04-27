<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import StartPath from './StartPath.svelte';
	import PausePath from './PausePath.svelte';
	import Icon from '../lib/icons/Icon.svelte';
	import TimeVizualizer from './TimeVizualizer.svelte';

	import {
		addPomodoroToStore,
		deletePomodoroFromStore,
		getPomodoroFromStore,
		startPomodoroInStore,
		stopPomodoroInStore,
	} from './pomodoroStore';
	import type Pomodoro from './pomodoroStore';
	import ResetPath from './ResetPath.svelte';

	let interval: NodeJS.Timer;
	let pomodoro: Pomodoro;
	let isStopped = true;
	$: isLoaded = false;
	$: isRunning = false;
	$: remainingTime = maxTime;
	let maxTime = 15 * 60;

	onMount(() => {
		pomodoro = getPomodoroFromStore() ?? addPomodoroToStore(maxTime);
		maxTime = Math.floor(pomodoro.remainingTime / 60) * 60;
		refreshPomodoro();
		interval = setInterval(refreshPomodoro, 1);
		audio = new Audio(audioUrl);
		audio.addEventListener('ended', () => resetAudio());
		isLoaded = true;
	});

	function startPomodoro() {
		if (isLoaded) {
			if (pomodoro.remainingTime == 0) resetPomodoro();
			if (isStopped) {
				deletePomodoroFromStore(pomodoro.id);
				pomodoro = addPomodoroToStore(maxTime);
			}
			startPomodoroInStore(pomodoro.id);
			isStopped = false;
			refreshPomodoro();
		}
	}

	function pausePomodoro() {
		if (isLoaded) {
			stopPomodoroInStore(pomodoro.id);
			refreshPomodoro();
		}
	}

	function resetPomodoro() {
		if (isLoaded) {
			deletePomodoroFromStore(pomodoro.id);
			resetAudio();
			pomodoro = addPomodoroToStore(maxTime);
			refreshPomodoro();
			isStopped = true;
		}
	}

	function resetAudio() {
		audio.pause();
		audio.currentTime = 0;
	}

	function refreshPomodoro() {
		if (isLoaded && !isStopped) {
			let wasRunning = isRunning;
			isRunning = pomodoro.isRunning;
			remainingTime = pomodoro.remainingTime;

			if (
				wasRunning &&
				!isRunning &&
				remainingTime === 0 &&
				audio.paused === true
			) {
				audio.play();
			}
		}
	}

	onDestroy(() => {
		pausePomodoro();
	});

	let audio: HTMLAudioElement;
	const audioUrl = '/sounds/alarm2.mp3';
</script>

{#if isLoaded}
	<div class="wide-component">
		<div class="wide-row">
			<TimeVizualizer time={remainingTime} />
			{#if isRunning}
				<button class="round-button gray-button" on:click={pausePomodoro}>
					<Icon>
						<PausePath />
					</Icon>
				</button>
			{:else}
				<button class="round-button blue-button" on:click={startPomodoro}>
					<Icon>
						<StartPath />
					</Icon>
				</button>
			{/if}

			{#if isStopped}
				<input
					type="range"
					class="slider"
					id="pomodoroMaxTime"
					min={60}
					max={60 * 60}
					step="60"
					bind:value={maxTime}
					disabled={isRunning}
				/>
				<label for="pomodoroMaxTime" class="sr-only"
					>{maxTime / 60} minutes</label
				>
			{:else}
				<button class="round-button red-button" on:click={resetPomodoro}>
					<Icon>
						<ResetPath />
					</Icon>
				</button>
			{/if}
		</div>
	</div>
{/if}
