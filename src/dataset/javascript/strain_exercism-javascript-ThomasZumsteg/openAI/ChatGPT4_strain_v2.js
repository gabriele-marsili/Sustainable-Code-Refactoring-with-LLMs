export default {
	keep,
	discard,
};

function keep(items, func) {
	/* Selects items for which a function is True */
	return items.filter(func);
}

function discard(items, func) {
	/* Selects items for which a function is False */
	return items.filter(item => !func(item));
}