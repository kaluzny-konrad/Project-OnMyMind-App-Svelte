<script lang="ts">
	export let time = 0;
	function formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	}
</script>

<div class="text-4xl font-bold">
	{formatTime(time)}
</div>
