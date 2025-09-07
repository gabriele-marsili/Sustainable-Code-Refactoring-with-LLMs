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
		Smoke    string
	}

	nationalities := []string{"Englishman", "Spaniard", "Ukrainian", "Norwegian", "Japanese"}
	colors := []string{"Red", "Green", "Ivory", "Yellow", "Blue"}
	pets := []string{"Dog", "Snails", "Fox", "Horse", "Zebra"}
	drinks := []string{"Tea", "Coffee", "Milk", "Orange juice", "Water"}
	smokes := []string{"Old Gold", "Kools", "Chesterfields", "Lucky Strike", "Parliaments"}

	houses := [5]House{}

	var findSolution func(int) bool

	findSolution = func(index int) bool {
		if index == 5 {
			// All houses are assigned, check the constraints
			// 1. The Englishman lives in the Red house.
			englishmanRed := false
			// 2. The Spaniard owns the Dog.
			spaniardDog := false
			// 3. Coffee is drunk in the Green house.
			coffeeGreen := false
			// 4. The Ukrainian drinks Tea.
			ukrainianTea := false
			// 5. The Green house is immediately to the right of the Ivory house.
			greenRightOfIvory := false
			// 6. The Old Gold smoker owns Snails.
			oldGoldSnails := false
			// 7. Kools are smoked in the Yellow house.
			koolsYellow := false
			// 8. Milk is drunk in the middle house.
			milkMiddle := false
			// 9. The Norwegian lives in the first house.
			norwegianFirst := false
			// 10. The man who smokes Chesterfields lives in the house next to the man with the Fox.
			chesterfieldsNextToFox := false
			// 11. Kools are smoked in the house next to the house where the Horse is kept.
			koolsNextToHorse := false
			// 12. The Lucky Strike smoker drinks Orange juice.
			luckyStrikeOrange := false
			// 13. The Japanese smokes Parliaments.
			japaneseParliaments := false
			// 14. The Norwegian lives next to the Blue house.
			norwegianNextToBlue := false

			for i := 0; i < 5; i++ {
				if houses[i].Nationality == "Englishman" && houses[i].Color == "Red" {
					englishmanRed = true
				}
				if houses[i].Nationality == "Spaniard" && houses[i].Pet == "Dog" {
					spaniardDog = true
				}
				if houses[i].Drink == "Coffee" && houses[i].Color == "Green" {
					coffeeGreen = true
				}
				if houses[i].Nationality == "Ukrainian" && houses[i].Drink == "Tea" {
					ukrainianTea = true
				}
				if houses[i].Smoke == "Old Gold" && houses[i].Pet == "Snails" {
					oldGoldSnails = true
				}
				if houses[i].Smoke == "Kools" && houses[i].Color == "Yellow" {
					koolsYellow = true
				}
				if i == 2 && houses[i].Drink == "Milk" {
					milkMiddle = true
				}
				if i == 0 && houses[i].Nationality == "Norwegian" {
					norwegianFirst = true
				}
				if houses[i].Smoke == "Lucky Strike" && houses[i].Drink == "Orange juice" {
					luckyStrikeOrange = true
				}
				if houses[i].Nationality == "Japanese" && houses[i].Smoke == "Parliaments" {
					japaneseParliaments = true
				}

				if i > 0 && houses[i].Color == "Green" && houses[i-1].Color == "Ivory" {
					greenRightOfIvory = true
				}
				if i > 0 && ((houses[i].Smoke == "Chesterfields" && houses[i-1].Pet == "Fox") || (houses[i].Pet == "Fox" && houses[i-1].Smoke == "Chesterfields")) {
					chesterfieldsNextToFox = true
				}
				if i > 0 && ((houses[i].Smoke == "Kools" && houses[i-1].Pet == "Horse") || (houses[i].Pet == "Horse" && houses[i-1].Smoke == "Kools")) {
					koolsNextToHorse = true
				}
				if i > 0 && ((houses[i].Nationality == "Norwegian" && houses[i-1].Color == "Blue") || (houses[i].Color == "Blue" && houses[i-1].Nationality == "Norwegian")) {
					norwegianNextToBlue = true
				}
			}

			if englishmanRed && spaniardDog && coffeeGreen && ukrainianTea && greenRightOfIvory && oldGoldSnails && koolsYellow && milkMiddle && norwegianFirst && chesterfieldsNextToFox && koolsNextToHorse && luckyStrikeOrange && japaneseParliaments && norwegianNextToBlue {
				// Find who drinks water and owns the zebra
				waterDrinker := ""
				zebraOwner := ""
				for i := 0; i < 5; i++ {
					if houses[i].Drink == "Water" {
						waterDrinker = houses[i].Nationality
					}
					if houses[i].Pet == "Zebra" {
						zebraOwner = houses[i].Nationality
					}
				}
				return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
			}
			return false
		}

		// Permute the values for the current house
		for _, nationality := range nationalities {
			foundNationality := false
			for i := 0; i < index; i++ {
				if houses[i].Nationality == nationality {
					foundNationality = true
					break
				}
			}
			if foundNationality {
				continue
			}
			houses[index].Nationality = nationality

			for _, color := range colors {
				foundColor := false
				for i := 0; i < index; i++ {
					if houses[i].Color == color {
						foundColor = true
						break
					}
				}
				if foundColor {
					continue
				}
				houses[index].Color = color

				for _, pet := range pets {
					foundPet := false
					for i := 0; i < index; i++ {
						if houses[i].Pet == pet {
							foundPet = true
							break
						}
					}
					if foundPet {
						continue
					}
					houses[index].Pet = pet

					for _, drink := range drinks {
						foundDrink := false
						for i := 0; i < index; i++ {
							if houses[i].Drink == drink {
								foundDrink = true
								break
							}
						}
						if foundDrink {
							continue
						}
						houses[index].Drink = drink

						for _, smoke := range smokes {
							foundSmoke := false
							for i := 0; i < index; i++ {
								if houses[i].Smoke == smoke {
									foundSmoke = true
									break
								}
							}
							if foundSmoke {
								continue
							}
							houses[index].Smoke = smoke

							if findSolution(index + 1) {
								return true
							}
						}
					}
				}
			}
		}
		return false
	}

	if findSolution(0) {
		// Find who drinks water and owns the zebra
		waterDrinker := ""
		zebraOwner := ""
		for i := 0; i < 5; i++ {
			if houses[i].Drink == "Water" {
				waterDrinker = houses[i].Nationality
			}
			if houses[i].Pet == "Zebra" {
				zebraOwner = houses[i].Nationality
			}
		}
		return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
	}

	return Solution{}
}