// @ts-check

/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export function dayRate(ratePerHour) {
	return ratePerHour << 3; // Bitwise left shift by 3 is equivalent to * 8
}

/**
 * Calculates the rate per month
 *
 * @param {number} ratePerHour
 * @param {number} discount for example 20% written as 0.2
 * @returns {number} the rounded up monthly rate
 */
export function monthRate(ratePerHour, discount) {
	const dailyRate = ratePerHour << 3;
	const monthlyRate = dailyRate * 22 * (1 - discount);
	return Math.ceil(monthlyRate);
}

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget the total budget
 * @param {number} ratePerHour the rate per hour
 * @param {number} discount to apply, example 20% written as 0.2
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour, discount) {
	const dailyRate = ratePerHour << 3;
	const discountedDailyRate = dailyRate * (1 - discount);
	return Math.floor(budget / discountedDailyRate);
}