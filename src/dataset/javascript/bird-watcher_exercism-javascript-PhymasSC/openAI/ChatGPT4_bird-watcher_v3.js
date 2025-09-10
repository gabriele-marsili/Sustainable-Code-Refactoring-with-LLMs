// @ts-check

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */
export function totalBirdCount(birdsPerDay) {
	return birdsPerDay.reduce((sum, count) => sum + count, 0);
}

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
export function birdsInWeek(birdsPerDay, week) {
	const start = (week - 1) * 7;
	let sum = 0;
	for (let i = start; i < start + 7 && i < birdsPerDay.length; i++) {
		sum += birdsPerDay[i];
	}
	return sum;
}

/**
 * Fixes the counting mistake by increasing the bird count
 * by one for every second day.
 *
 * @param {number[]} birdsPerDay
 * @returns {number[]} corrected bird count data
 */
export function fixBirdCountLog(birdsPerDay) {
	for (let i = 0; i < birdsPerDay.length; i += 2) {
		birdsPerDay[i]++;
	}
	return birdsPerDay;
}