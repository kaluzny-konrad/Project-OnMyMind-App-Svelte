<script>
	import httpPost from '../../api/sendMailApi';
	$: message = '';
	$: email = '';
	$: sent = false;
	$: error = false;
	$: errorMessage = '';

	async function handleSubmit() {
		cleanSubmit();
		const response = await httpPost(email, message);
		if (response.status === 'success') {
			sent = true;
			cleanForm();
		} else {
			error = true;
			errorMessage = response.message;
		}
	}

	function cleanSubmit() {
		sent = false;
		error = false;
		errorMessage = '';
	}

	function cleanForm() {
		email = '';
		message = '';
	}
</script>

<div data-testid="contact-form">
	<form on:submit|preventDefault={handleSubmit}>
		{#if sent}
			<div
				role="alert"
				class="mb-4 rounded-md bg-green-100 px-4 py-2 text-green-800"
			>
				Message sent successfully!
			</div>
		{:else if error}
			<div
				role="alert"
				class="mb-4 rounded-md bg-red-100 px-4 py-2 text-red-800"
			>
				{errorMessage}
			</div>
		{/if}

		<div class="mb-4">
			<label class="mb-2 block font-bold text-gray-700" for="email">
				Email
			</label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="email"
				name="email"
				type="email"
				placeholder="Your email"
				bind:value={email}
				required
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block font-bold text-gray-700" for="message">
				Message
			</label>
			<textarea
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="message"
				name="message"
				placeholder="Your message"
				bind:value={message}
				required
			/>
		</div>
		<button
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			type="submit"
			data-testid="submit-button"
		>
			Send
		</button>
	</form>
</div>
