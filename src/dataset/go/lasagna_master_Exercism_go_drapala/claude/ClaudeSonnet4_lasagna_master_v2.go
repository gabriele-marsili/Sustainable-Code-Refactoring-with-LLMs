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
    return append(myList, friendsList[len(friendsList)-1])
}

func ScaleRecipe(quantities []float64, numPortions int) []float64 {
    if numPortions == 2 {
        return quantities
    }
    
    scale := float64(numPortions) / 2.0
    result := make([]float64, len(quantities))
    
    for i, quantity := range quantities {
        result[i] = quantity * scale
    }
    
    return result
}