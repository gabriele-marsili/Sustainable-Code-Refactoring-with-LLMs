function accumulate(items, func) {
	if (!items || items.length === 0) return [];
	
	const modified = new Array(items.length);
	for (let i = 0; i < items.length; i++) {
		modified[i] = func(items[i]);
	}
	return modified;
}

export default accumulate;