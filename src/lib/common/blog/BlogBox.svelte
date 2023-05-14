<script lang="ts">
	import type BlogInfo from '../../types/BlogInfo';

	export let blog: BlogInfo;
</script>

<div data-testid="blog-box">
	<a data-testid="blog-{blog.shortName}" href="/blog/{blog.shortName}">
		<div class="border-focus my-4 bg-white p-4">
			<h2 data-testid="blog-title" class="mb-2 text-xl font-semibold">
				{blog.title}
			</h2>
			<p data-testid="blog-description">{blog.description}</p>
			<p data-testid="blog-date">{blog.date}</p>
		</div>
	</a>
</div>
