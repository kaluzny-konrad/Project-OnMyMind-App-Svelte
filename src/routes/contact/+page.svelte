<script>
	$: email = '';
	$: message = '';
	$: sent = false;
	$: error = false;

	async function handleSubmit() {
		sent = true;
		if (sent) {
			cleanForm();
		} else {
			error = true;
		}
	}

	function cleanForm() {
		email = '';
		message = '';
	}
</script>

<div class="container mx-auto max-w-xl px-4 py-8">
	<h1 class="mb-4 text-4xl font-bold">Contact</h1>

	{#if sent}
		<div class="mb-4 rounded-md bg-green-100 px-4 py-2 text-green-800">
			Message sent successfully!
		</div>
	{:else if error}
		<div class="mb-4 rounded-md bg-red-100 px-4 py-2 text-red-800">
			Error sending message, please try again later.
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label class="mb-2 block font-bold text-gray-700" for="email">
				Email
			</label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				id="email"
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
				placeholder="Your message"
				bind:value={message}
				required
			/>
		</div>
		<button
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			type="submit"
		>
			Send
		</button>
	</form>
</div>
