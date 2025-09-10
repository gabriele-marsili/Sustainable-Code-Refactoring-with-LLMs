package lasagna

func PreparationTime(layers []string, time int) int {
	if time == 0 {
		return len(layers) * 2
	}
	return len(layers) * time
}

func Quantities(layers []string) (int, float64) {
	noodles := 0
	var sauce float64

	for _, layer := range layers {
		switch layer {
		case "noodles":
			noodles += 50
		case "sauce":
			sauce += 0.2
		}
	}

	return noodles, sauce
}

func AddSecretIngredient(friendsList []string, myList []string) []string {
	lastIndex := len(friendsList) - 1
	secretIngredient := friendsList[lastIndex]
	return append(myList, secretIngredient)
}

func ScaleRecipe(quantities []float64, numPortions int) []float64 {
	if numPortions == 2 {
		return quantities
	}

	scaleFactor := float64(numPortions) / 2.0
	scaledQuantities := make([]float64, len(quantities))

	for i, quantity := range quantities {
		scaledQuantities[i] = quantity * scaleFactor
	}

	return scaledQuantities
}