<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from '../lib/common/header/Header.svelte';
	import Footer from '../lib/common/footer/Footer.svelte';
	import CookieConsent from '../lib/common/cookie/CookieConsent.svelte';
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
