<script lang="ts">
	import type { BlogInfo } from '../../lib/types/BlogInfo';
	import { httpGetBlogsInfo } from '../../lib/api/blogApi';
	import { onMount } from 'svelte';

	let blogs: BlogInfo[] = [];

	onMount(async () => {
		const data = await httpGetBlogsInfo();
		blogs = data;
	});
</script>

<svelte:head>
	<title>OnMyMind Blog</title>
	<meta name="description" content="Blog about app OnMyMind." />
</svelte:head>

<main class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Blog</h1>
	{#each blogs as blog}
		<a href="/blog/{blog.shortName}">
			<article class="fancy-box my-4 bg-white">
				<h2 class="mb-2 text-xl font-semibold">{blog.title}</h2>
				<p>{blog.description}</p>
				<p>{blog.date}</p>
			</article>
		</a>
	{/each}
</main>

<style>
	article {
		border: 1px solid #ddd;
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
