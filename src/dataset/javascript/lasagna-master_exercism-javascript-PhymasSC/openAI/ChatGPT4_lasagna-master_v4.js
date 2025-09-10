/// <reference path="./global.d.ts" />

import { throws } from "assert";

// @ts-check

export function cookingStatus(remainingTime) {
	return remainingTime === 0
		? "Lasagna is done."
		: remainingTime == null
		? "You forgot to set the timer."
		: "Not done, please wait.";
}

export function preparationTime(layers, meanPrepTime = 2) {
	return layers.length * meanPrepTime;
}

export function quantities(layers) {
	let noodles = 0, sauce = 0;
	for (const ingredient of layers) {
		if (ingredient.toLowerCase() === "noodles") noodles += 50;
		else if (ingredient.toLowerCase() === "sauce") sauce += 0.2;
	}
	return { noodles, sauce };
}

export function addSecretIngredient(friendsList, myList) {
	myList.push(friendsList.at(-1));
}

export function scaleRecipe(recipe, factor = 2) {
	const scaledRecipe = {};
	for (const [ingredient, quantity] of Object.entries(recipe)) {
		scaledRecipe[ingredient] = quantity * factor;
	}
	return scaledRecipe;
}