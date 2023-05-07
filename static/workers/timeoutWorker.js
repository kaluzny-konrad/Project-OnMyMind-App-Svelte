self.onmessage = (event) => {
	console.log('timeoutWorker: timeout start');
	setTimeout(() => {
		self.postMessage({ type: 'timeout' });
		console.log('timeoutWorker: timeout');
	}, event.data.delay);
};
