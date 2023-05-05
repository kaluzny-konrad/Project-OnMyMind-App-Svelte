<script lang="ts">
	let errorMessage = '';
	$: email = '';

	function handleSubmit(event: Event) {
		event.preventDefault();

		if (email.trim() === '') {
			errorMessage = 'Email field cannot be empty';
			return;
		}

		console.log(`New newsletter: ${email}`);
		errorMessage = '';

		email = '';
	}
</script>

<div class="m-auto my-8 max-w-xl">
	<form on:submit={handleSubmit} class="">
		<label for="newsletter" class="mb-2 block text-gray-400"
			>Subscribe to our newsletter:</label
		>
		<div class="flex px-4">
			<input
				type="email"
				id="newsletter"
				name="newsletter"
				placeholder="Enter your email"
				class="w-full rounded-l-lg bg-gray-800 px-4 py-2 text-gray-400 outline-none"
				bind:value={email}
			/>
			<button
				type="submit"
				class="rounded-r-lg bg-gray-700 px-4 py-2 transition-colors duration-300 hover:bg-gray-600"
			>
				Subscribe
			</button>
		</div>
		<p class="mt-2 h-0.5 text-red-500">
			{#if errorMessage}
				* {errorMessage}
			{/if}
		</p>
	</form>
</div>
