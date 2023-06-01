<script lang="ts">
	import type BlogContent from '../../../lib/types/BlogContent';
	import type BlogInfo from '../../../lib/types/BlogInfo';
	import Blog from '../../../lib/common/blog/Blog.svelte';

	export let data;
	const { blogContentPromise: blogContent, blogInfo } = data;
</script>

<svelte:head>
	<title>OnMyMind Blog</title>
	<meta name="description" content="Blog about app OnMyMind." />
</svelte:head>

<div class="wide-page">
	{#if blogContent}
		<Blog {blogContent} {blogInfo} />
	{/if}
</div>
