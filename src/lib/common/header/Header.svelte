<script lang="ts">
	import Logo from './Logo.svelte';
	import NavElement from './NavElement.svelte';
</script>

<header class="sticky top-0 z-50 mb-4 bg-white shadow">
	<nav class="container mx-auto">
		<div class="flex items-center justify-between">
			<Logo />
			<div class="flex">
				<NavElement name="App" href="/" />
				<NavElement name="Blog" href="/blog" />
				<NavElement name="About" href="/about" />
			</div>
		</div>
	</nav>
</header>
