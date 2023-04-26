<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from './Header.svelte';
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
