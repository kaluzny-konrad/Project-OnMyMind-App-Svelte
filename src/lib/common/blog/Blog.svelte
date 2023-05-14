<script lang="ts">
	import type BlogContent from '../../types/BlogContent';
	import type BlogInfo from '../../types/BlogInfo';

	export let blogContent: BlogContent;
	export let blogInfo: BlogInfo;
</script>

<h1 data-testid="blog-title" class="page-title">
	{blogInfo.title}
</h1>
<p>{blogContent.content}</p>
