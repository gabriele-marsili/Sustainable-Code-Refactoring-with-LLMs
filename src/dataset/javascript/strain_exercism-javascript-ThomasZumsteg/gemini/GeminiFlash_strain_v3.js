export default {
	keep: keep,
	discard: discard,
};

function keep(items, func) {
	const kept = [];
	for (const item of items) {
		if (func(item)) {
			kept.push(item);
		}
	}
	return kept;
}

function discard(items, func) {
	const discarded = [];
	for (const item of items) {
		if (!func(item)) {
			discarded.push(item);
		}
	}
	return discarded;
}