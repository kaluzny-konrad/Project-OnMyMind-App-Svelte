<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from '../lib/header/Header.svelte';
	import Footer from '../lib/footer/Footer.svelte';
	import CookieConsent from '$lib/common/CookieConsent.svelte';
</script>

<Header />

<div class="app">
	<main>
		<slot />
	</main>
</div>

<CookieConsent />
<Footer />

<style>
	.app {
		min-height: calc(100vh);
	}
</style>
