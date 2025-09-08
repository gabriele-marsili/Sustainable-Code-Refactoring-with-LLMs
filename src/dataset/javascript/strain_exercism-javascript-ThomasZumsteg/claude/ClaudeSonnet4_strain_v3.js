export default {
	keep: keep,
	discard: discard,
}

function keep(items, func) {
	const kept = [];
	const length = items.length;
	for (let i = 0; i < length; i++) {
		if (func(items[i])) {
			kept.push(items[i]);
		}
	}
	return kept;
}

function discard(items, func) {
	const kept = [];
	const length = items.length;
	for (let i = 0; i < length; i++) {
		if (!func(items[i])) {
			kept.push(items[i]);
		}
	}
	return kept;
}