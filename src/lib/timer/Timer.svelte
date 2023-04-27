<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getTimerFromStore,
		addTimerToStore,
		startTimerInStore,
		stopTimerInStore,
	} from './timerStore';
	import type Timer from './timerStore';
	import TimeVizualizer from './TimeVizualizer.svelte';

	import StartPath from '../icons/StartPath.svelte';
	import PausePath from '../icons/PausePath.svelte';
	import Icon from '../icons/Icon.svelte';

	export let mindId: string;
	export let active: boolean;
	let timer: Timer;
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
		time = timer.time;
	}
</script>

<div class="flex items-center justify-center space-x-4 text-center">
	<TimeVizualizer {time} />
	{#if active}
		{#if isRunning}
			<button class="round-button gray-button" on:click={pauseTimer}
				><Icon>
					<PausePath />
				</Icon></button
			>
		{:else}
			<button class="round-button blue-button" on:click={startTimer}
				><Icon>
					<StartPath />
				</Icon></button
			>
		{/if}
	{/if}
</div>
