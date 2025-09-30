function accumulate(items, func) {
	const length = items.length;
	const modified = new Array(length);
	for (let i = 0; i < length; i++) {
		modified[i] = func(items[i]);
	}
	return modified;
}

export default accumulate;