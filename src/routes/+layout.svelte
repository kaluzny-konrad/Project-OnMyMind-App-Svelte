<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from './Header.svelte';
	import UsingTimer from '$lib/common/timer/TimeSum.svelte';
</script>

<Header />

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		min-height: calc(100vh - 7rem);
	}
</style>
