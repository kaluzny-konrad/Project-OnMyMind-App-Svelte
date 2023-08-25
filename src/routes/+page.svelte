<script lang="ts">
	import StatusScreen from '../lib/common/statusScreen/StatusScreen.svelte';
	import MindSection from '../lib/common/mind/MindSection.svelte';
	import Pomodoro from '../lib/common/pomodoro/PomodoroTimer.svelte';
</script>

<svelte:head>
	<title>OnMyMind</title>
	<meta
		name="description"
		content="An app to track multiple tasks running in parallel with Pomodoro rules and stat tracking."
	/>
</svelte:head>

<div class="flex justify-center">
	<div class="w-full max-w-screen-lg flex flex-col md:flex-row">
		<div class="md:w-2/12 p-4 order-1 md:order-1 h-10">
			<StatusScreen />
		</div>
		<div class="w-full md:w-10/12 p-4 order-2 md:order-2">
			<Pomodoro />
			<MindSection />
		</div>
	</div>
</div>
