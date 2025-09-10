// @ts-check

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
	const juiceTimes = {
		"pure strawberry joy": 0.5,
		energizer: 1.5,
		"green garden": 1.5,
		"tropical island": 3,
		"all or nothing": 5,
	};
	return juiceTimes[name.toLowerCase().trim()] ?? 2.5;
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
	if (wedgesNeeded === 0) return 0;
	let totalWedges = 0;
	const wedgesPerLime = { small: 6, medium: 8, large: 10 };

	for (let i = 0; i < limes.length; i++) {
		totalWedges += wedgesPerLime[limes[i]];
		if (totalWedges >= wedgesNeeded) return i + 1;
	}
	return limes.length;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
	let i = 0;
	while (i < orders.length && timeLeft > 0) {
		timeLeft -= timeToMixJuice(orders[i]);
		i++;
	}
	return orders.slice(i);
}