<script lang="ts">
	import type BlogContent from '../../../lib/types/BlogContent';
	import type BlogInfo from '../../../lib/types/BlogInfo';
	import Blog from '../../../lib/common/blog/Blog.svelte';

	export let data;
	const { blogContent, blogInfo } = data;
</script>

<svelte:head>
	<title>Blog - {blogInfo?.title}</title>
	<meta name="description" content={blogInfo?.description} />
</svelte:head>

<div class="wide-page">
	{#if blogContent}
		<Blog {blogContent} {blogInfo} />
	{/if}
</div>
