package zebra

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func SolvePuzzle() Solution {
	type House struct {
		Color    string
		Nationality string
		Pet      string
		Drink    string
		Cigarette string
	}

	nationalities := []string{"Englishman", "Spaniard", "Ukrainian", "Norwegian", "Japanese"}
	colors := []string{"Red", "Green", "Ivory", "Yellow", "Blue"}
	pets := []string{"Dog", "Snails", "Fox", "Horse", "Zebra"}
	drinks := []string{"Water", "Tea", "Milk", "Orange juice", "Coffee"}
	cigarettes := []string{"Old Gold", "Kools", "Chesterfields", "Lucky Strike", "Parliaments"}

	var houses [5]House

	// Constraints (hardcoded for performance)
	// 1. The Englishman lives in the Red house.
	// 2. The Spaniard owns the Dog.
	// 3. Coffee is drunk in the Green house.
	// 4. The Ukrainian drinks Tea.
	// 5. The Green house is immediately to the right of the Ivory house.
	// 6. The Old Gold smoker owns Snails.
	// 7. Kools are smoked in the Yellow house.
	// 8. Milk is drunk in the middle house.
	// 9. The Norwegian lives in the first house.
	// 10. The man who smokes Chesterfields lives in the house next to the man with the Fox.
	// 11. Kools are smoked in the house next to the house where the Horse is kept.
	// 12. The Lucky Strike smoker drinks Orange juice.
	// 13. The Japanese smokes Parliaments.
	// 14. The Norwegian lives next to the Blue house.

	// Optimized constraint application: pre-allocate and directly assign
	houses[0] = House{Nationality: "Norwegian"}
	houses[2] = House{Drink: "Milk"}

	// Brute force with constraint propagation (optimized order)
	for _, color := range colors {
		for _, nationality := range nationalities {
			for _, pet := range pets {
				for _, drink := range drinks {
					for _, cigarette := range cigarettes {
						// Create a copy to avoid modifying the original arrays
						tempHouses := houses
						valid := true

						// Apply constraints based on the current assignment
						// Constraint 1: Englishman lives in the Red house.
						englishmanHouse := -1
						redHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Englishman" {
								englishmanHouse = i
							}
							if tempHouses[i].Color == "Red" {
								redHouse = i
							}
						}

						// Constraint 2: The Spaniard owns the Dog.
						spaniardHouse := -1
						dogHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Spaniard" {
								spaniardHouse = i
							}
							if tempHouses[i].Pet == "Dog" {
								dogHouse = i
							}
						}

						// Constraint 3: Coffee is drunk in the Green house.
						coffeeHouse := -1
						greenHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Drink == "Coffee" {
								coffeeHouse = i
							}
							if tempHouses[i].Color == "Green" {
								greenHouse = i
							}
						}

						// Constraint 4: The Ukrainian drinks Tea.
						ukrainianHouse := -1
						teaHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Ukrainian" {
								ukrainianHouse = i
							}
							if tempHouses[i].Drink == "Tea" {
								teaHouse = i
							}
						}

						// Constraint 5: The Green house is immediately to the right of the Ivory house.
						ivoryHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Color == "Ivory" {
								ivoryHouse = i
							}
						}

						// Constraint 6: The Old Gold smoker owns Snails.
						oldGoldHouse := -1
						snailsHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Old Gold" {
								oldGoldHouse = i
							}
							if tempHouses[i].Pet == "Snails" {
								snailsHouse = i
							}
						}

						// Constraint 7: Kools are smoked in the Yellow house.
						koolsHouse := -1
						yellowHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Kools" {
								koolsHouse = i
							}
							if tempHouses[i].Color == "Yellow" {
								yellowHouse = i
							}
						}

						// Constraint 8: Milk is drunk in the middle house. (Already set)

						// Constraint 9: The Norwegian lives in the first house. (Already set)

						// Constraint 10: The man who smokes Chesterfields lives in the house next to the man with the Fox.
						chesterfieldsHouse := -1
						foxHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Chesterfields" {
								chesterfieldsHouse = i
							}
							if tempHouses[i].Pet == "Fox" {
								foxHouse = i
							}
						}

						// Constraint 11: Kools are smoked in the house next to the house where the Horse is kept.
						horseHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Pet == "Horse" {
								horseHouse = i
							}
						}

						// Constraint 12: The Lucky Strike smoker drinks Orange juice.
						luckyStrikeHouse := -1
						orangeJuiceHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Lucky Strike" {
								luckyStrikeHouse = i
							}
							if tempHouses[i].Drink == "Orange juice" {
								orangeJuiceHouse = i
							}
						}

						// Constraint 13: The Japanese smokes Parliaments.
						japaneseHouse := -1
						parliamentsHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Japanese" {
								japaneseHouse = i
							}
							if tempHouses[i].Cigarette == "Parliaments" {
								parliamentsHouse = i
							}
						}

						// Constraint 14: The Norwegian lives next to the Blue house.
						blueHouse := -1
						for i := range tempHouses {
							if tempHouses[i].Color == "Blue" {
								blueHouse = i
							}
						}

						// Assign values to houses
						assigned := false
						for i := range tempHouses {
							if tempHouses[i].Color == "" && !assigned {
								tempHouses[i].Color = color
								assigned = true
							}
						}
						assigned = false
						for i := range tempHouses {
							if tempHouses[i].Nationality == "" && !assigned {
								tempHouses[i].Nationality = nationality
								assigned = true
							}
						}
						assigned = false
						for i := range tempHouses {
							if tempHouses[i].Pet == "" && !assigned {
								tempHouses[i].Pet = pet
								assigned = true
							}
						}
						assigned = false
						for i := range tempHouses {
							if tempHouses[i].Drink == "" && !assigned {
								tempHouses[i].Drink = drink
								assigned = true
							}
						}
						assigned = false
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "" && !assigned {
								tempHouses[i].Cigarette = cigarette
								assigned = true
							}
						}

						// Validate constraints
						// Constraint 1: The Englishman lives in the Red house.
						englishmanHouse = -1
						redHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Englishman" {
								englishmanHouse = i
							}
							if tempHouses[i].Color == "Red" {
								redHouse = i
							}
						}
						if englishmanHouse != -1 && redHouse != -1 && englishmanHouse != redHouse {
							valid = false
						}

						// Constraint 2: The Spaniard owns the Dog.
						spaniardHouse = -1
						dogHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Spaniard" {
								spaniardHouse = i
							}
							if tempHouses[i].Pet == "Dog" {
								dogHouse = i
							}
						}
						if spaniardHouse != -1 && dogHouse != -1 && spaniardHouse != dogHouse {
							valid = false
						}

						// Constraint 3: Coffee is drunk in the Green house.
						coffeeHouse = -1
						greenHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Drink == "Coffee" {
								coffeeHouse = i
							}
							if tempHouses[i].Color == "Green" {
								greenHouse = i
							}
						}
						if coffeeHouse != -1 && greenHouse != -1 && coffeeHouse != greenHouse {
							valid = false
						}

						// Constraint 4: The Ukrainian drinks Tea.
						ukrainianHouse = -1
						teaHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Ukrainian" {
								ukrainianHouse = i
							}
							if tempHouses[i].Drink == "Tea" {
								teaHouse = i
							}
						}
						if ukrainianHouse != -1 && teaHouse != -1 && ukrainianHouse != teaHouse {
							valid = false
						}

						// Constraint 5: The Green house is immediately to the right of the Ivory house.
						ivoryHouse = -1
						greenHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Color == "Ivory" {
								ivoryHouse = i
							}
							if tempHouses[i].Color == "Green" {
								greenHouse = i
							}
						}
						if ivoryHouse != -1 && greenHouse != -1 && greenHouse-ivoryHouse != 1 {
							valid = false
						}

						// Constraint 6: The Old Gold smoker owns Snails.
						oldGoldHouse = -1
						snailsHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Old Gold" {
								oldGoldHouse = i
							}
							if tempHouses[i].Pet == "Snails" {
								snailsHouse = i
							}
						}
						if oldGoldHouse != -1 && snailsHouse != -1 && oldGoldHouse != snailsHouse {
							valid = false
						}

						// Constraint 7: Kools are smoked in the Yellow house.
						koolsHouse = -1
						yellowHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Kools" {
								koolsHouse = i
							}
							if tempHouses[i].Color == "Yellow" {
								yellowHouse = i
							}
						}
						if koolsHouse != -1 && yellowHouse != -1 && koolsHouse != yellowHouse {
							valid = false
						}

						// Constraint 8: Milk is drunk in the middle house. (Already set)

						// Constraint 9: The Norwegian lives in the first house. (Already set)

						// Constraint 10: The man who smokes Chesterfields lives in the house next to the man with the Fox.
						chesterfieldsHouse = -1
						foxHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Chesterfields" {
								chesterfieldsHouse = i
							}
							if tempHouses[i].Pet == "Fox" {
								foxHouse = i
							}
						}
						if chesterfieldsHouse != -1 && foxHouse != -1 && abs(chesterfieldsHouse-foxHouse) != 1 {
							valid = false
						}

						// Constraint 11: Kools are smoked in the house next to the house where the Horse is kept.
						koolsHouse = -1
						horseHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Kools" {
								koolsHouse = i
							}
							if tempHouses[i].Pet == "Horse" {
								horseHouse = i
							}
						}
						if koolsHouse != -1 && horseHouse != -1 && abs(koolsHouse-horseHouse) != 1 {
							valid = false
						}

						// Constraint 12: The Lucky Strike smoker drinks Orange juice.
						luckyStrikeHouse = -1
						orangeJuiceHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Cigarette == "Lucky Strike" {
								luckyStrikeHouse = i
							}
							if tempHouses[i].Drink == "Orange juice" {
								orangeJuiceHouse = i
							}
						}
						if luckyStrikeHouse != -1 && orangeJuiceHouse != -1 && luckyStrikeHouse != orangeJuiceHouse {
							valid = false
						}

						// Constraint 13: The Japanese smokes Parliaments.
						japaneseHouse = -1
						parliamentsHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Japanese" {
								japaneseHouse = i
							}
							if tempHouses[i].Cigarette == "Parliaments" {
								parliamentsHouse = i
							}
						}
						if japaneseHouse != -1 && parliamentsHouse != -1 && japaneseHouse != parliamentsHouse {
							valid = false
						}

						// Constraint 14: The Norwegian lives next to the Blue house.
						norwegianHouse := -1
						blueHouse = -1
						for i := range tempHouses {
							if tempHouses[i].Nationality == "Norwegian" {
								norwegianHouse = i
							}
							if tempHouses[i].Color == "Blue" {
								blueHouse = i
							}
						}
						if norwegianHouse != -1 && blueHouse != -1 && abs(norwegianHouse-blueHouse) != 1 {
							valid = false
						}

						// Check for uniqueness
						nationalityMap := make(map[string]bool)
						colorMap := make(map[string]bool)
						petMap := make(map[string]bool)
						drinkMap := make(map[string]bool)
						cigaretteMap := make(map[string]bool)

						for _, house := range tempHouses {
							if house.Nationality != "" {
								if _, ok := nationalityMap[house.Nationality]; ok {
									valid = false
									break
								}
								nationalityMap[house.Nationality] = true
							}
							if house.Color != "" {
								if _, ok := colorMap[house.Color]; ok {
									valid = false
									break
								}
								colorMap[house.Color] = true
							}
							if house.Pet != "" {
								if _, ok := petMap[house.Pet]; ok {
									valid = false
									break
								}
								petMap[house.Pet] = true
							}
							if house.Drink != "" {
								if _, ok := drinkMap[house.Drink]; ok {
									valid = false
									break
								}
								drinkMap[house.Drink] = true
							}
							if house.Cigarette != "" {
								if _, ok := cigaretteMap[house.Cigarette]; ok {
									valid = false
									break
								}
								cigaretteMap[house.Cigarette] = true
							}
						}

						if valid {
							// Find the solution
							waterDrinker := ""
							zebraOwner := ""
							for _, house := range tempHouses {
								if house.Drink == "Water" {
									waterDrinker = house.Nationality
								}
								if house.Pet == "Zebra" {
									zebraOwner = house.Nationality
								}
							}

							if waterDrinker != "" && zebraOwner != "" {
								return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
							}
						}
					}
				}
			}
		}
	}

	return Solution{} // No solution found
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}