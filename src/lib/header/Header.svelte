<script lang="ts">
	import Logo from './Logo.svelte';
	import NavElement from './NavElement.svelte';
</script>

<header class="mb-4">
	<nav class="bg-white shadow">
		<div class="container m-auto">
			<div class="flex items-center justify-between">
				<Logo />
				<div class="flex">
					<NavElement name="Home" href="/" />
				</div>
			</div>
		</div>
	</nav>
</header>
