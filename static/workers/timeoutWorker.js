self.onmessage = (event) => {
	setTimeout(() => self.postMessage({ type: 'timeout' }), event.data.delay);
};
