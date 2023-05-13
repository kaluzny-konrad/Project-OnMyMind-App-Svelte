<script lang="ts">
	import type { BlogInfo } from '../../lib/types/BlogInfo';
	import { httpGetBlogsInfo } from '../../lib/api/blogApi';
	import { onMount } from 'svelte';
	import BlogBox from './BlogBox.svelte';

	let blogs: BlogInfo[] = [];

	onMount(async () => {
		const data = await httpGetBlogsInfo();
		blogs = data;
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Blog</h1>
	{#each blogs as blog}
		<BlogBox {blog} />
	{/each}
</div>
