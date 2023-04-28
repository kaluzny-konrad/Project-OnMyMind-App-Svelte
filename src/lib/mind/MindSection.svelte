<script lang="ts">
	import { minds } from '../mind/mindStore';
	import MindRows from '../mind/MindRows.svelte';
	import NewMind from './NewMind.svelte';

	$: openMinds = $minds.filter((mind) => mind.isComplete === false);
	$: closedMinds = $minds.filter((mind) => mind.isComplete === true);
</script>

<NewMind />

<MindRows minds={openMinds} title="Rozpoczęte zadania" />

<MindRows minds={closedMinds} title="Zakończone zadania" />
