<script lang="ts">
	import type { BlogInfo } from '../../lib/types/BlogInfo';

	export let blog: BlogInfo;
</script>

<a href="/blog/{blog.shortName}">
	<article class="my-4 bg-white">
		<h2 data-testid="blog-title" class="mb-2 text-xl font-semibold">
			{blog.title}
		</h2>
		<p>{blog.description}</p>
		<p>{blog.date}</p>
	</article>
</a>

<style>
	article {
		border: 1px solid #ddd;
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
