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

	onMount(async () => {
		const response = await fetch('/speed');
		const result = await response.json();
		console.log(result);
		console.log($page.url.pathname);
		console.log($page.params);
		if (browser) {
			webVitals({
				path: $page.url.pathname,
				params: $page.params,
				analyticsId,
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
