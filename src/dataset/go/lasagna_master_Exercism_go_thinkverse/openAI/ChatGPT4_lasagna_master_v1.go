package lasagna

// PreparationTime returns the estimated preparation time based on the layers and average prep time:
func PreparationTime(layers []string, avg int) int {
	if avg <= 0 {
		avg = 2
	}
	return len(layers) * avg
}

// Quantities calculates the amount of noodles and sauce needed based on the layers:
//
// noodles in grams, sauce in liters
func Quantities(layers []string) (noodles int, sauce float64) {
	for i := 0; i < len(layers); i++ {
		switch layers[i] {
		case "noodles":
			noodles += 50
		case "sauce":
			sauce += 0.2
		}
	}
	return
}

// AddSecretIngredient takes the secret ingredient from a recipe and adds it to your layers:
func AddSecretIngredient(recipe, layers []string) {
	layers[len(layers)-1] = recipe[len(recipe)-1]
}

// ScaleRecipe scales a recipe based on the amounts needed for 2 portions, and the portions wanted:
func ScaleRecipe(amounts []float64, portions int) []float64 {
	scaleFactor := float64(portions) / 2
	needs := make([]float64, len(amounts))
	for i := 0; i < len(amounts); i++ {
		needs[i] = amounts[i] * scaleFactor
	}
	return needs
}