/// <reference path="./global.d.ts" />

import { throws } from "assert";

// @ts-check

export function cookingStatus(remainingTime) {
	if (remainingTime === 0) return "Lasagna is done.";
	return remainingTime ? "Not done, please wait." : "You forgot to set the timer.";
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