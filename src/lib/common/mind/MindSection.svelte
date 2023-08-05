<script lang="ts">
	import { minds } from '../../stores/mindStore';
	import MindList from './MindList.svelte';
	import NewMind from './NewMind.svelte';

	$: openMinds = $minds.filter((mind) => mind.isComplete === false);
	$: closedMinds = $minds
		.filter((mind) => mind.isComplete === true)
		.sort((a, b) => {
			if (a.completeDateTime === undefined || b.completeDateTime === undefined)
				return 0;

			if (a.completeDateTime < b.completeDateTime) return 1;

			if (a.completeDateTime > b.completeDateTime) return -1;

			return 0;
		});
</script>

<NewMind />

<div class="wide-component-title">In progress</div>
<MindList minds={openMinds} />

<div class="wide-component-title">Completed</div>
<MindList minds={closedMinds} />
