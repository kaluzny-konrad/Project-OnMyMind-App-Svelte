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
	import type Pomodoro from './pomodoroStore';

	const MAX_TIME = 15 * 60;
	let interval: NodeJS.Timer;
	let pomodoro: Pomodoro;
	let isStopped = true;
	$: isLoaded = false;
	$: isRunning = false;
	let maxTime = MAX_TIME;
	$: remainingTime = maxTime;

	onMount(() => {
		pomodoro = getPomodoroFromStore() ?? addPomodoroToStore(maxTime);
		isRunning = pomodoro.isRunning;
		remainingTime = pomodoro.remainingTime;
		isStopped = !pomodoro.isRunning;
		maxTime = Math.floor(pomodoro.remainingTime / 60) * 60;
		if (isStopped) {
			pomodoro.remainingTime = MAX_TIME;
			remainingTime = MAX_TIME;
		}
		refreshPomodoro();
		interval = setInterval(refreshPomodoro, 1);
		audio = new Audio(audioUrl);
		audio.addEventListener('ended', () => resetAudio());
		isLoaded = true;
	});

	function startPomodoro() {
		if (isLoaded) {
			if (pomodoro.remainingTime === 0) resetPomodoro();
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
	const audioUrl = '/sounds/alarm.mp3';
</script>

{#if isLoaded}
	<div class="wide-component">
		<div class="wide-row">
			<TimeVizualizer time={remainingTime} />
			{#if isRunning}
				<button class="round-button gray-button" on:click={pausePomodoro}>
					<span class="sr-only">Zatrzymaj Pomodoro</span>
					<Icon>
						<PausePath />
					</Icon>
				</button>
			{:else}
				<button class="round-button blue-button" on:click={startPomodoro}>
					<span class="sr-only">Uruchom Pomodoro</span>
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
					min={1}
					max={60 * 60}
					step="1"
					bind:value={maxTime}
					disabled={isRunning}
				/>
				<label for="pomodoroMaxTime" class="sr-only"
					>{maxTime / 60} minutes</label
				>
			{:else}
				<button class="round-button red-button" on:click={resetPomodoro}>
					<span class="sr-only">Zresetuj Pomodoro</span>
					<Icon>
						<ResetPath />
					</Icon>
				</button>
			{/if}
		</div>
	</div>
{/if}
