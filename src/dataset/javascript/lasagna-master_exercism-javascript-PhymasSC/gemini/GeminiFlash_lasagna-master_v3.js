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
	if (!remainingTime) return "You forgot to set the timer.";
	return "Not done, please wait.";
}

/**
 * Estimate the preparation time by given array of layers and average preparation time
 *
 * @param {String[]} layers
 * @param {number} meanPrepTime
 * @returns {number} the estimated preparation time
 */
export function preparationTime(layers, meanPrepTime) {
	return layers.length * (meanPrepTime || 2);
}

/**
 * Calculate the quantities of noodles and sauce required to cook the lasagna
 *
 * @param {String[]} layers
 * @returns {Recipe} the amount of noodles and sauce required
 */
export function quantities(layers) {
	let numberOfNoodles = 0;
	let numberOfSauce = 0;

	for (let i = 0; i < layers.length; i++) {
		const layer = layers[i].toLowerCase();
		if (layer === "noodles") {
			numberOfNoodles++;
		} else if (layer === "sauce") {
			numberOfSauce++;
		}
	}

	return { noodles: numberOfNoodles * 50, sauce: numberOfSauce * 0.2 };
}

/**
 * Add secret ingredient of friend into my list
 *
 * @param {String[]} friendsList
 * @param {String[]} myList
 */
export function addSecretIngredient(friendsList, myList) {
	myList.push(friendsList[friendsList.length - 1]);
}

/**
 *
 * @param {Recipe} recipe
 * @param {number} factor
 * @returns
 */
export function scaleRecipe(recipe, factor) {
	const scalingFactor = factor === undefined ? 0.5 : factor * 0.5;
	const scaledRecipe = {};

	for (const ingredient in recipe) {
		if (Object.hasOwn(recipe, ingredient)) {
			scaledRecipe[ingredient] = recipe[ingredient] * scalingFactor;
		}
	}

	return scaledRecipe;
}