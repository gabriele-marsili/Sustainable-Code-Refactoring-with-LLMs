// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
	const juiceName = name.toLowerCase().trim();
	switch (juiceName) {
		case "pure strawberry joy":
			return 0.5;
		case "energizer":
		case "green garden":
			return 1.5;
		case "tropical island":
			return 3;
		case "all or nothing":
			return 5;
		default:
			return 2.5;
	}
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
	if (wedgesNeeded <= 0) return 0;

	const wedgesPerLime = {
		small: 6,
		medium: 8,
		large: 10,
	};

	let limesCut = 0;
	let totalWedges = 0;

	for (const lime of limes) {
		const wedges = wedgesPerLime[lime];
		if (wedges === undefined) continue; // Handle unknown lime sizes gracefully

		totalWedges += wedges;
		limesCut++;

		if (totalWedges >= wedgesNeeded) {
			return limesCut;
		}
	}

	return limesCut;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
	let timeRemaining = timeLeft;
	let i = 0;

	while (timeRemaining > 0 && i < orders.length) {
		timeRemaining -= timeToMixJuice(orders[i]);
		i++;
	}

	return orders.slice(i);
}