<script>
	import { getSuccessAnimationStatus } from '$lib/stores/animationStore';
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';
	import { onMount } from 'svelte';

	let animation;

	function refreshAnimation() {
		animation = getSuccessAnimationStatus();
		requestAnimationFrame(refreshAnimation);
	}

	onMount(() => {
		requestAnimationFrame(refreshAnimation);
	});
</script>

<main class="flex min-h-screen flex-col items-center">
	<div class={animation?.isFadingOut() ? 'fadeOut' : ''}>
		{#if animation?.isRunning() || animation?.isFadingOut()}
			<LottiePlayer
				src="animations/animation_success.json"
				autoplay={true}
				loop={false}
				controls={false}
				renderer="svg"
				background="transparent"
				height={600}
				width={600}
				controlsLayout="[]"
				speed={1.0}
			/>
		{/if}
	</div>
</main>

<style>
	.fadeOut {
		opacity: 0;
		transition: opacity 0.5s ease-out;
	}
</style>
