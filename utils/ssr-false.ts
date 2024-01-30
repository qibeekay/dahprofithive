export const ssrFalse = (callback: () => void) => {
	if (typeof window !== 'undefined') {
		callback();
	}
};
