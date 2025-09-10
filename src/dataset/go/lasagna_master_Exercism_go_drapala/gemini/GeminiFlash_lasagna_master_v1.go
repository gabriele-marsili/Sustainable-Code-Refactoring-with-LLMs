package lasagna

func PreparationTime(layers []string, time int) int {
	if time == 0 {
		time = 2
	}
	return len(layers) * time
}

func Quantities(layers []string) (int, float64) {
	noodles := 0
	sauce := 0.0

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
	lastIngredient := friendsList[len(friendsList)-1]
	return append(myList, lastIngredient)
}

func ScaleRecipe(quantities []float64, numPortions int) []float64 {
	scaleFactor := float64(numPortions) / 2.0
	scaledQuantities := make([]float64, len(quantities))

	for i, quantity := range quantities {
		scaledQuantities[i] = quantity * scaleFactor
	}

	return scaledQuantities
}