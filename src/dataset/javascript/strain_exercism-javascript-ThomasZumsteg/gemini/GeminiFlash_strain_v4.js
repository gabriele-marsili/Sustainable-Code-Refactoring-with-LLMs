export default {
	keep: keep,
	discard: discard,
}

function keep(items, func) {
	/* Selects items for which a function is True */
	const kept = [];
	for (let i = 0; i < items.length; i++) {
		if (func(items[i])) {
			kept.push(items[i]);
		}
	}
	return kept;
}

function discard(items, func) {
	/* Selects items for which a function is False */
	const discarded = [];
	for (let i = 0; i < items.length; i++) {
		if (!func(items[i])) {
			discarded.push(items[i]);
		}
	}
	return discarded;
}