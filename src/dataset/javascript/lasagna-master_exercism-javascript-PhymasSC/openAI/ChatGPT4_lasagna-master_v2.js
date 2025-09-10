/// <reference path="./global.d.ts" />

// @ts-check

/**
 * Check the cooking status by remaining time.
 *
 * @param {number} remainingTime
 * @returns {string} the cooking status
 */
export function cookingStatus(remainingTime) {
	if (remainingTime === 0) return "Lasagna is done.";
	return remainingTime ? "Not done, please wait." : "You forgot to set the timer.";
}

/**
 * Estimate the preparation time by given array of layers and average preparation time
 *
 * @param {String[]} layers
 * @param {number} meanPrepTime
 * @returns {number} the estimated preparation time
 */
export function preparationTime(layers, meanPrepTime = 2) {
	return layers.length * meanPrepTime;
}

/**
 * Calculate the quantities of noodles and sauce required to cook the lasagna
 *
 * @param {String[]} layers
 * @returns {Recipe} the amount of noodles and sauce required
 */
export function quantities(layers) {
	let noodles = 0, sauce = 0;
	for (const ingredient of layers) {
		if (ingredient.toLowerCase() === "noodles") noodles += 50;
		else if (ingredient.toLowerCase() === "sauce") sauce += 0.2;
	}
	return { noodles, sauce };
}

/**
 * Add secret ingredient of friend into my list
 *
 * @param {String[]} friendsList
 * @param {String[]} myList
 */
export function addSecretIngredient(friendsList, myList) {
	myList.push(friendsList.at(-1));
}

/**
 *
 * @param {Recipe} recipe
 * @param {number} factor
 * @returns
 */
export function scaleRecipe(recipe, factor = 2) {
	const scaledRecipe = {};
	for (const [ingredient, quantity] of Object.entries(recipe)) {
		scaledRecipe[ingredient] = quantity * factor;
	}
	return scaledRecipe;
}