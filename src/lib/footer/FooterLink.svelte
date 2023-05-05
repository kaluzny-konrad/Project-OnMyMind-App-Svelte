<script lang="ts">
	export let href: string = '/';
	export let text: string;
	export let first: boolean = false;
</script>

{#if !first}
	<span class="mx-2 text-gray-400">•</span>
{/if}

<a {href} class="text-gray-400 hover:text-gray-100">{text}</a>
