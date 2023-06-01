<script lang="ts">
	import Blog from '../../../lib/common/blog/Blog.svelte';
	export let data;
	const { blogContent, blogInfo } = data;
</script>

<svelte:head>
	<title>Blog - {blogInfo?.title}</title>
	<meta name="description" content={blogInfo?.description} />
</svelte:head>

<div class="wide-page">
	{#if blogContent && blogInfo}
		<Blog {blogContent} {blogInfo} />
	{/if}
</div>
