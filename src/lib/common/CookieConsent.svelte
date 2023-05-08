<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const COOKIE_CONSENT_KEY = 'cookie_consent';

	let isConsentGiven = false;
	let isPopupVisible = false;

	const cookieConsentStore = writable(false);
	onMount(() => {
		isConsentGiven = getConsentFromLocalStorage();
		if (isConsentGiven === null) {
			isPopupVisible = true;
		}
	});

	function getConsentFromLocalStorage() {
		return localStorage.getItem(COOKIE_CONSENT_KEY);
	}

	function handleConsent() {
		localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
		cookieConsentStore.set(true);
		isPopupVisible = false;
	}

	function handleDisagree() {
		localStorage.setItem(COOKIE_CONSENT_KEY, 'false');
		cookieConsentStore.set(false);
		isPopupVisible = false;
		deleteCookies();
	}

	function deleteCookies() {
		const cookies = document.cookie.split(';');
		cookies.forEach((cookie) => {
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
		});
		location.reload();
	}

	setContext('cookieConsent', cookieConsentStore);
</script>

{#if isPopupVisible}
	<div class="fixed bottom-40 left-0 right-0 z-50 bg-white p-4">
		<div class="mx-auto max-w-xl rounded-lg p-4 text-center shadow-lg">
			<p class="mb-2 text-sm text-gray-500">
				This website uses cookies to ensure you get the best experience on our
				website.
			</p>
			<div class="flex justify-center space-x-2">
				<button class="round-button blue-button" on:click={handleConsent}>
					I Agree
				</button>
				<button class="round-button gray-button" on:click={handleDisagree}>
					I Disagree
				</button>
			</div>
		</div>
	</div>
{/if}
