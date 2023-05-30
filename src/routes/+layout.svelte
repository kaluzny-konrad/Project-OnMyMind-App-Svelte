<script lang="ts">
	import '../app.css';
	import './styles.css';
	import Header from '../lib/common/header/Header.svelte';
	import Footer from '../lib/common/footer/Footer.svelte';
	import CookieConsent from '../lib/common/cookie/CookieConsent.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';

	inject({ mode: dev ? 'development' : 'production' });

	import { webVitals } from '../lib/webvitals';
	import { page } from '$app/stores';

	const analyticsId: string = import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID;

	onMount(() => {
		const path = $page.url.pathname;
		const params = $page.params;
		console.log('webVitals');
		console.log(path);
		console.log(params);
		console.log(analyticsId);
		if (analyticsId) webVitals({ path, params, analyticsId });
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
