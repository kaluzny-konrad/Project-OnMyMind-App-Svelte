<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from '../lib/common/header/Header.svelte';
	import Footer from '../lib/common/footer/Footer.svelte';
	import CookieConsent from '../lib/common/cookie/CookieConsent.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	import { webVitals } from '../vitals.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
		console.log('analyticsId', analyticsId);
		if ('navigator' in window && analyticsId) {
			webVitals({
				analyticsId: analyticsId,
				debug: true,
				path: $page.route.id, // '/blog/[slug]', // Odpowiednia ścieżka
			});
		}
	});
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
