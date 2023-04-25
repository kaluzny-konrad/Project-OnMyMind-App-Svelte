<script lang="ts">
	import { minds } from '$lib/store/mindStore';
	import MindRows from './MindRows.svelte';
	import NewMind from './newMind/NewMind.svelte';

	$: openMinds = $minds.filter(
		(mind) => mind.isComplete === false,
	);
	$: closedMinds = $minds.filter(
		(mind) => mind.isComplete === true,
	);
</script>

<NewMind />

<MindRows minds={openMinds} title="Open Minds" />

<MindRows minds={closedMinds} title="Closed Minds" />
