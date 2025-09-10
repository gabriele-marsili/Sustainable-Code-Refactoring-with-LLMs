// @ts-check

/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export const dayRate = (ratePerHour) => 8 * ratePerHour;

/**
 * Calculates the rate per month
 *
 * @param {number} ratePerHour
 * @param {number} discount for example 20% written as 0.2
 * @returns {number} the rounded up monthly rate
 */
export const monthRate = (ratePerHour, discount) => 
    Math.ceil((1 - discount) * dayRate(ratePerHour) * 22);

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget the total budget
 * @param {number} ratePerHour the rate per hour
 * @param {number} discount to apply, example 20% written as 0.2
 * @returns {number} the number of days
 */
export const daysInBudget = (budget, ratePerHour, discount) => 
    Math.floor(budget / ((1 - discount) * dayRate(ratePerHour)));