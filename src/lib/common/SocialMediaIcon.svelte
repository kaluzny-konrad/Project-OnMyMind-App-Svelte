<script lang="ts">
	export let href: string = '/';
	import FilledIcon from '../icons/FilledIcon.svelte';
</script>

<div class="mx-4">
	<a {href}>
		<FilledIcon>
			<slot />
		</FilledIcon>
	</a>
</div>
