package lasagna

func PreparationTime(layers []string, avg int) int {
	if avg <= 0 {
		avg = 2
	}
	return len(layers) * avg
}

func Quantities(layers []string) (noodles int, sauce float64) {
	noodlesCount, sauceCount := 0, 0
	for _, layer := range layers {
		switch layer {
		case "noodles":
			noodlesCount++
		case "sauce":
			sauceCount++
		}
	}
	return noodlesCount * 50, float64(sauceCount) * 0.2
}

func AddSecretIngredient(recipe, layers []string) {
	layers[len(layers)-1] = recipe[len(recipe)-1]
}

func ScaleRecipe(amounts []float64, portions int) []float64 {
	scaleFactor := float64(portions) / 2
	for i := range amounts {
		amounts[i] *= scaleFactor
	}
	return amounts
}