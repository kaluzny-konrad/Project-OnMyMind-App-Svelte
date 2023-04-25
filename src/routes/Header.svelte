<script lang="ts">
	import Pomodoro from '$lib/common/pomodoro/Pomodoro.svelte';
	import Logo from '$lib/common/elements/Logo.svelte';
</script>

<header class="mb-4">
	<nav class="bg-white shadow container mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<Logo />
			<div class="flex">
				<Pomodoro />
			</div>
		</div>
	</nav>
</header>
