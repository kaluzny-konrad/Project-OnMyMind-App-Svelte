<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getTimerFromStore,
		addTimerToStore,
		startTimerInStore,
		stopTimerInStore,
	} from './timerStore';
	import type MindTimer from './MindTimer';
	import TimeVizualizer from '../common/TimeVizualizer.svelte';

	import StartPath from '../icons/StartPath.svelte';
	import PausePath from '../icons/PausePath.svelte';
	import Icon from '../icons/Icon.svelte';

	export let mindId: string;
	export let active: boolean;
	let timer: MindTimer;
	let interval: NodeJS.Timer;
	$: isRunning = false;
	$: time = 0;

	onMount(() => {
		timer = getTimerFromStore(mindId) ?? addTimerToStore(mindId);
		refreshTimer();
		interval = setInterval(refreshTimer, 1);
	});

	function startTimer() {
		startTimerInStore(mindId);
		refreshTimer();
	}

	function pauseTimer() {
		stopTimerInStore(mindId);
		refreshTimer();
	}

	function refreshTimer() {
		isRunning = timer.isRunning;
		time = timer.getTimeElapsed();
	}
</script>

<div class="flex items-center justify-center space-x-4 text-center">
	<TimeVizualizer {time} />
	{#if active}
		{#if isRunning}
			<button class="round-button gray-button" on:click={pauseTimer}>
				<span class="sr-only">Zatrzymaj Licznik Czasu</span>
				<Icon>
					<PausePath />
				</Icon>
			</button>
		{:else}
			<button class="round-button blue-button" on:click={startTimer}>
				<span class="sr-only">Uruchom Licznik Czasu</span>
				<Icon>
					<StartPath />
				</Icon>
			</button>
		{/if}
	{/if}
</div>
