<script>
	import { onMount, setContext } from 'svelte';
	import { get, writable } from 'svelte/store';

	const COOKIE_CONSENT_KEY = 'cookie_consent';

	let isConsentGiven = false;
	let isPopupVisible = false;

	const consentStore = writable(false);

	onMount(() => {
		isConsentGiven = getConsentFromLocalStorage();
		if (!isConsentGiven) {
			isPopupVisible = true;
		}
	});

	function getConsentFromLocalStorage() {
		const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
		return storedConsent === 'true';
	}

	function handleConsent() {
		localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
		consentStore.set(true);
		isPopupVisible = false;
	}

	setContext('consent', consentStore);
</script>

{#if isPopupVisible}
	<div class="fixed bottom-0 left-0 right-0 z-50 bg-white p-4">
		<div class="mx-auto max-w-md rounded-lg p-4 text-center shadow-lg">
			<p class="mb-2 text-sm text-gray-500">
				This website uses cookies to ensure you get the best experience on our
				website.
			</p>
			<div class="flex justify-center space-x-2">
				<button class="round-button blue-button" on:click={handleConsent}>
					I Agree
				</button>
				<button
					class="round-button gray-button"
					on:click={() => (isPopupVisible = false)}
				>
					I Disagree
				</button>
			</div>
		</div>
	</div>
{/if}
