<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import StartPath from '$lib/common/iconPaths/StartPath.svelte';
	import PausePath from '$lib/common/iconPaths/PausePath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';
	import TimeVizualizer from '$lib/common/timer/TimeVizualizer.svelte';

	import {
		addPomodoroToStore,
		deletePomodoroFromStore,
		getPomodoroFromStore,
		startPomodoroInStore,
		stopPomodoroInStore,
	} from '$lib/store/pomodoroStore';
	import type Pomodoro from '$lib/store/pomodoroStore';
	import ResetPath from '../iconPaths/ResetPath.svelte';

	const MAX_TIME = 15 * 60; // maksymalny czas w sekundach

	let interval: NodeJS.Timer;
	let pomodoro: Pomodoro;
	$: isLoaded = false;
	$: isRunning = false;
	$: remainingTime = MAX_TIME;

	onMount(() => {
		pomodoro = getPomodoroFromStore() ?? addPomodoroToStore(MAX_TIME);
		refreshPomodoro();
		interval = setInterval(refreshPomodoro, 1);
		isLoaded = true;
	});

	function startPomodoro() {
		if (pomodoro) {
			startPomodoroInStore(pomodoro.id);
			refreshPomodoro();
		}
	}

	function pausePomodoro() {
		if (pomodoro) {
			stopPomodoroInStore(pomodoro.id);
			refreshPomodoro();
		}
	}

	function resetPomodoro() {
		if (pomodoro) {
			deletePomodoroFromStore(pomodoro.id);
			pomodoro = addPomodoroToStore(MAX_TIME);
			refreshPomodoro();
		}
	}

	function refreshPomodoro() {
		if (pomodoro) {
			isRunning = pomodoro.isRunning;
			remainingTime = pomodoro.remainingTime;
		}
	}

	onDestroy(() => {
		pausePomodoro();
	});
</script>

{#if isLoaded}
	<div class="text-center">
		<div class="flex justify-center space-x-4">
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
			<button class="round-button red-button" on:click={resetPomodoro}>
				<Icon>
					<ResetPath />
				</Icon>
			</button>
		</div>
	</div>
{/if}
