<script lang="ts">
	import { minds } from '../../stores/mindStore';
	import MindRows from './MindRows.svelte';
	import NewMind from './NewMind.svelte';

	$: openMinds = $minds.filter((mind) => mind.isComplete === false);
	$: closedMinds = $minds.filter((mind) => mind.isComplete === true);
</script>

<NewMind />

<MindRows minds={openMinds} title="In progress" />

<MindRows minds={closedMinds} title="Completed" />
