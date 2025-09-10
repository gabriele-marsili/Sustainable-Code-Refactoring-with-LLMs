package lasagna

// PreparationTime returns the estimated preparation time based on the layers and average prep time:
func PreparationTime(layers []string, avg int) int {
	if avg <= 0 {
		return len(layers) * 2
	}
	return len(layers) * avg
}

// Quantities calculates the amount of noodles and sauce needed based on the layers:
//
// noodles in grams, sauce in liters
func Quantities(layers []string) (noodles int, sauce float64) {
	noodleCount := 0
	sauceCount := 0.0
	for _, layer := range layers {
		switch layer {
		case "noodles":
			noodleCount++
		case "sauce":
			sauceCount++
		}
	}

	noodles = noodleCount * 50
	sauce = sauceCount * 0.2
	return
}

// AddSecretIngredient takes the secret ingredient from a recipe and adds it to your layers:
func AddSecretIngredient(recipe, layers []string) {
	if len(recipe) > 0 && len(layers) > 0 {
		layers[len(layers)-1] = recipe[len(recipe)-1]
	}
}

// ScaleRecipe scales a recipe based on the amounts needed for 2 portions, and the portions wanted:
func ScaleRecipe(amounts []float64, portions int) []float64 {
	scaleFactor := float64(portions) / 2.0
	scaledAmounts := make([]float64, len(amounts))

	for i, amount := range amounts {
		scaledAmounts[i] = amount * scaleFactor
	}

	return scaledAmounts
}