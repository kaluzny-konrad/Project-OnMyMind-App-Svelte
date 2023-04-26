<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getTimerFromStore,
		addTimerToStore,
		startTimerInStore,
		stopTimerInStore,
	} from '$lib/store/timerStore';
	import type Timer from '$lib/store/timerStore';
	import { writable } from 'svelte/store';

	import StartPath from '$lib/common/iconPaths/StartPath.svelte';
	import PausePath from '$lib/common/iconPaths/PausePath.svelte';
	import Icon from '$lib/common/elements/Icon.svelte';
	import TimeVizualizer from './TimeVizualizer.svelte';

	export let mindId: string;
	export let active: boolean;
	let timer: Timer;
	let interval: NodeJS.Timer;
	$: isRunning = false;
	$: time = writable(0);

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
		time.update(() => timer.time);
	}
</script>

<div class="flex items-center justify-center space-x-4 text-center">
	<TimeVizualizer time={$time} />
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
