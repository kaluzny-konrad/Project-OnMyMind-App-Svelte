<script lang="ts">
	export let time = 0;
	function formatTime(time: number): string {
		const hours = Math.floor(time / 60 / 60 / 1000);
		const minutes = Math.floor(time / 60 / 1000 - hours * 60);
		const seconds = Math.floor(time / 1000 - hours * 60 * 60 - minutes * 60);
		let timeString = '';

		if (hours > 0) timeString += `${hours.toString().padStart(2, '0')}:`;
		timeString += `${minutes.toString().padStart(2, '0')}:`;
		timeString += `${seconds.toString().padStart(2, '0')}`;

		return timeString;
	}
</script>

<div class="text-4xl font-bold">
	{formatTime(time)}
</div>
