<script lang="ts">
	import { page } from '$app/stores';
	import Blog from '$lib/common/blog/Blog.svelte';
	$: shortName = $page.params.shortname;
</script>

<svelte:head>
	<title>OnMyMind Blog</title>
	<meta name="description" content="Blog about app OnMyMind." />
</svelte:head>

<div class="wide-page">
	<Blog {shortName} />
</div>
