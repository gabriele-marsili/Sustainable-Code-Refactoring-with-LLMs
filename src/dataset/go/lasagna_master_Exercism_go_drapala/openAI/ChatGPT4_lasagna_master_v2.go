package lasagna

func PreparationTime(layers []string, time int) int {
    if time == 0 {
        time = 2
    }
    return len(layers) * time
}

func Quantities(layers []string) (int, float64) {
    var noodles int
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
    return append(myList, friendsList[len(friendsList)-1])
}

func ScaleRecipe(quantities []float64, numPortions int) []float64 {
    factor := float64(numPortions) / 2.0
    scaled := make([]float64, len(quantities))

    for i, quantity := range quantities {
        scaled[i] = quantity * factor
    }

    return scaled
}