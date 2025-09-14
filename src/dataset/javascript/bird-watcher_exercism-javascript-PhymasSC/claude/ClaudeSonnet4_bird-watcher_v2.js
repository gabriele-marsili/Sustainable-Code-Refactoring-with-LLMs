// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */
export function totalBirdCount(birdsPerDay) {
	let sum = 0;
	for (let i = 0; i < birdsPerDay.length; i++) {
		sum += birdsPerDay[i];
	}
	return sum;
}

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
export function birdsInWeek(birdsPerDay, week) {
	const firstDayInWeek = (week - 1) * 7;
	const lastDayInWeek = Math.min(firstDayInWeek + 7, birdsPerDay.length);
	let sum = 0;
	for (let i = firstDayInWeek; i < lastDayInWeek; i++) {
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
	for (let day = 0; day < birdsPerDay.length; day += 2) {
		birdsPerDay[day]++;
	}
	return birdsPerDay;
}