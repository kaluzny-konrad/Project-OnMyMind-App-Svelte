<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	$: isMounted = writable(0);

	onMount(() => {
		isMounted.set(1);
	});
</script>

<p data-testid="isMounted">{isMounted.subscribe}</p>
