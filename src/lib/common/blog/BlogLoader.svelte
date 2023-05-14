<script lang="ts">
	import { onMount } from 'svelte';
	import { getBlogContent, getBlogInfo } from '../../api/blogApi';
	import type BlogContent from '../../types/BlogContent';
	import type BlogInfo from '../../types/BlogInfo';

	export let shortName: string;
	let blogContent: BlogContent;
	let blogInfo: BlogInfo;

	onMount(async () => {
		blogContent = await getBlogContent(shortName);
		blogInfo = await getBlogInfo(shortName);
	});
</script>

{#if blogContent && blogInfo}

<Blog blogContent={blogContent} blogInfo={blogInfo} />

{:else}
	<p>Loading...</p>
{/if}
