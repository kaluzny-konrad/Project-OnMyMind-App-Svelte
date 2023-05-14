<script lang="ts">
	import type BlogInfo from '../../types/BlogInfo';
	import { getBlogsInfo } from '../../api/blogApi';
	import { onMount } from 'svelte';
	import BlogBox from './BlogBox.svelte';

	let blogs: BlogInfo[] = [];

	onMount(async () => (blogs = await getBlogsInfo()));
</script>

{#each blogs as blog}
	<BlogBox {blog} />
{/each}
