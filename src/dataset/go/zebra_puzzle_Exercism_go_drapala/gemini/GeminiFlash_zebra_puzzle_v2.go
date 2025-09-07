package zebra

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func SolvePuzzle() Solution {
	// Define the possible values for each attribute
	colors := []string{"red", "green", "ivory", "yellow", "blue"}
	nationalities := []string{"Englishman", "Spaniard", "Ukrainian", "Norwegian", "Japanese"}
	drinks := []string{"tea", "coffee", "milk", "orange juice", "water"}
	smokes := []string{"Old Gold", "Kools", "Chesterfields", "Lucky Strike", "Parliaments"}
	pets := []string{"dog", "snails", "fox", "horse", "zebra"}

	// Generate all possible permutations of the attributes
	colorPermutations := permutations(colors)
	nationalityPermutations := permutations(nationalities)
	drinkPermutations := permutations(drinks)
	smokePermutations := permutations(smokes)
	petPermutations := permutations(pets)

	// Iterate through all possible combinations of permutations
	for _, colorPerm := range colorPermutations {
		for _, nationalityPerm := range nationalityPermutations {
			for _, drinkPerm := range drinkPermutations {
				for _, smokePerm := range smokePermutations {
					for _, petPerm := range petPermutations {
						// Check if the combination satisfies all the constraints
						if satisfiesConstraints(colorPerm, nationalityPerm, drinkPerm, smokePerm, petPerm) {
							// Find who drinks water and who owns the zebra
							waterDrinker := ""
							zebraOwner := ""
							for i := 0; i < 5; i++ {
								if drinkPerm[i] == "water" {
									waterDrinker = nationalityPerm[i]
								}
								if petPerm[i] == "zebra" {
									zebraOwner = nationalityPerm[i]
								}
							}
							return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
						}
					}
				}
			}
		}
	}

	// If no solution is found, return an empty solution
	return Solution{}
}

// Helper function to generate all permutations of a slice
func permutations(arr []string) [][]string {
	var helper func([]string, int)
	res := [][]string{}

	helper = func(arr []string, n int) {
		if n == 1 {
			tmp := make([]string, len(arr))
			copy(tmp, arr)
			res = append(res, tmp)
			return
		}

		for i := 0; i < n; i++ {
			helper(arr, n-1)
			if n%2 == 1 {
				tmp := arr[i]
				arr[i] = arr[n-1]
				arr[n-1] = tmp
			} else {
				tmp := arr[0]
				arr[0] = arr[n-1]
				arr[n-1] = tmp
			}
		}
	}
	helper(arr, len(arr))
	return res
}

// Helper function to check if a combination of permutations satisfies all the constraints
func satisfiesConstraints(colors, nationalities, drinks, smokes, pets []string) bool {
	// 1. The Englishman lives in the red house.
	englishmanIndex := indexOf(nationalities, "Englishman")
	if colors[englishmanIndex] != "red" {
		return false
	}

	// 2. The Spaniard owns the dog.
	spaniardIndex := indexOf(nationalities, "Spaniard")
	if pets[spaniardIndex] != "dog" {
		return false
	}

	// 3. Coffee is drunk in the green house.
	coffeeIndex := indexOf(drinks, "coffee")
	if colors[coffeeIndex] != "green" {
		return false
	}

	// 4. The Ukrainian drinks tea.
	ukrainianIndex := indexOf(nationalities, "Ukrainian")
	if drinks[ukrainianIndex] != "tea" {
		return false
	}

	// 5. The green house is immediately to the right of the ivory house.
	greenIndex := indexOf(colors, "green")
	ivoryIndex := indexOf(colors, "ivory")
	if greenIndex != ivoryIndex+1 {
		return false
	}

	// 6. The Old Gold smoker owns snails.
	oldGoldIndex := indexOf(smokes, "Old Gold")
	if pets[oldGoldIndex] != "snails" {
		return false
	}

	// 7. Kools are smoked in the yellow house.
	koolsIndex := indexOf(smokes, "Kools")
	if colors[koolsIndex] != "yellow" {
		return false
	}

	// 8. Milk is drunk in the middle house.
	if drinks[2] != "milk" {
		return false
	}

	// 9. The Norwegian lives in the first house.
	if nationalities[0] != "Norwegian" {
		return false
	}

	// 10. The man who smokes Chesterfields lives next to the man who owns the fox.
	chesterfieldsIndex := indexOf(smokes, "Chesterfields")
	foxIndex := indexOf(pets, "fox")
	if abs(chesterfieldsIndex-foxIndex) != 1 {
		return false
	}

	// 11. Kools are smoked next to the house where the horse is kept.
	koolsIndex = indexOf(smokes, "Kools")
	horseIndex := indexOf(pets, "horse")
	if abs(koolsIndex-horseIndex) != 1 {
		return false
	}

	// 12. The Lucky Strike smoker drinks orange juice.
	luckyStrikeIndex := indexOf(smokes, "Lucky Strike")
	if drinks[luckyStrikeIndex] != "orange juice" {
		return false
	}

	// 13. The Japanese smokes Parliaments.
	japaneseIndex := indexOf(nationalities, "Japanese")
	if smokes[japaneseIndex] != "Parliaments" {
		return false
	}

	// 14. The Norwegian lives next to the blue house.
	norwegianIndex := indexOf(nationalities, "Norwegian")
	blueIndex := indexOf(colors, "blue")
	if abs(norwegianIndex-blueIndex) != 1 {
		return false
	}

	// 15. The man who smokes Chesterfields has a neighbor who drinks water.
	chesterfieldsIndex = indexOf(smokes, "Chesterfields")
	waterIndex := indexOf(drinks, "water")
	if abs(chesterfieldsIndex-waterIndex) != 1 {
		return false
	}

	return true
}

// Helper function to find the index of an element in a slice
func indexOf(arr []string, element string) int {
	for i, value := range arr {
		if value == element {
			return i
		}
	}
	return -1
}

// Helper function to calculate the absolute value of an integer
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}