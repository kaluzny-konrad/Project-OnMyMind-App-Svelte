<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
	export let name: string;
	$: activeStyle =
		$page.route.id == href ? 'border-gray-400' : 'border-transparent';
</script>

{#if href && name}
	<a class="text-link font-bold" {href}>
		<div class="{activeStyle} border-b-2 p-6 hover:border-gray-800">
			{name}
		</div>
	</a>
{/if}
