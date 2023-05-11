<script lang="ts">
	import { page } from '$app/stores';
	import type { BlogContent } from '../../../lib/types/BlogContent';
	import {
		httpGetBlogContent,
		httpGetBlogInfo,
	} from '../../../lib/api/blogApi';
	import { onMount } from 'svelte';
	import type { BlogInfo } from '../../../lib/types/BlogInfo';

	let blogContent: BlogContent | undefined = undefined;
	let blogInfo: BlogInfo | undefined = undefined;

	onMount(async () => {
		const shortName = $page.params.shortname;
		console.log(shortName);
		blogContent = await httpGetBlogContent(shortName);
		blogInfo = await httpGetBlogInfo(shortName);
	});
</script>

{#if blogContent && blogInfo}
	<div class="container mx-auto p-4">
		<h1 class="mb-4 text-2xl font-bold">{blogInfo.title}</h1>
		<p>{blogContent.content}</p>
	</div>
{/if}
