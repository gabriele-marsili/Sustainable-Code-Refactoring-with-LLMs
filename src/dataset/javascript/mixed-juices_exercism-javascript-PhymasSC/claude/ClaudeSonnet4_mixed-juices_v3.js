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
	const normalizedName = name.toLowerCase().trim();
	
	if (normalizedName === "pure strawberry joy") return 0.5;
	if (normalizedName === "energizer" || normalizedName === "green garden") return 1.5;
	if (normalizedName === "tropical island") return 3;
	if (normalizedName === "all or nothing") return 5;
	return 2.5;
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
	
	for (let i = 0; i < limes.length; i++) {
		const size = limes[i];
		const wedges = size === "small" ? 6 : size === "medium" ? 8 : 10;
		
		if (totalWedges + wedges >= wedgesNeeded) {
			return i + 1;
		}
		totalWedges += wedges;
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
	let currentTime = timeLeft;
	let processedCount = 0;
	
	for (let i = 0; i < orders.length; i++) {
		currentTime -= timeToMixJuice(orders[i]);
		if (currentTime <= 0) break;
		processedCount++;
	}
	
	return orders.slice(processedCount);
}