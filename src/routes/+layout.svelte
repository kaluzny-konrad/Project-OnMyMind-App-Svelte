<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from '../lib/common/header/Header.svelte';
	import Footer from '../lib/common/footer/Footer.svelte';
	import CookieConsent from '../lib/common/cookie/CookieConsent.svelte';
	import { browser, dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';

	inject({ mode: dev ? 'development' : 'production' });

	import { webVitals } from '../lib/webvitals';
	import { page } from '$app/stores';

	const analyticsId: string = import.meta.env.VERCEL_ANALYTICS_ID;
	const analyticsId2: string = import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID;
	const analyticsId3: string = import.meta.env.VITE_VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		console.log('analyticsId', analyticsId);
		console.log('analyticsId2', analyticsId2);
		console.log('analyticsId3', analyticsId3);

		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId,
		});
	}
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
