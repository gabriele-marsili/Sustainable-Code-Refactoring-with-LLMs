package zebra

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func SolvePuzzle() Solution {
	houses := [5]struct {
		color    string
		nation   string
		pet      string
		drink    string
		cigarette string
	}{}

	nations := []string{"Englishman", "Spaniard", "Ukrainian", "Norwegian", "Japanese"}
	colors := []string{"Red", "Green", "Ivory", "Yellow", "Blue"}
	pets := []string{"Dog", "Snails", "Fox", "Horse", "Zebra"}
	drinks := []string{"Water", "Tea", "Milk", "Orange juice", "Coffee"}
	cigarettes := []string{"Old Gold", "Kools", "Chesterfields", "Lucky Strike", "Parliaments"}

	var permute func(int) bool
	permute = func(k int) bool {
		if k == 5 {
			// Apply the constraints
			houses[0].nation = "Norwegian"
			for i := 0; i < 5; i++ {
				if houses[i].color == "Red" && i > 0 && houses[i-1].color == "Green" {
					return false
				}
				if houses[i].color == "Green" && i < 4 && houses[i+1].color == "Red" {
					return false
				}
				if houses[i].nation == "Englishman" && houses[i].color != "Red" {
					return false
				}
				if houses[i].nation == "Spaniard" && houses[i].pet != "Dog" {
					return false
				}
				if houses[i].drink == "Coffee" && houses[i].color != "Green" {
					return false
				}
				if houses[i].nation == "Ukrainian" && houses[i].drink != "Tea" {
					return false
				}
				if houses[i].color == "Ivory" {
					for j := 0; j < 5; j++ {
						if houses[j].color == "Green" && (i == j-1 || i == j+1) {
							break
						} else if j == 4 {
							return false
						}
					}
				}
				if houses[i].cigarette == "Old Gold" && houses[i].pet != "Snails" {
					return false
				}
				if houses[i].cigarette == "Kools" && houses[i].color != "Yellow" {
					return false
				}
				if houses[2].drink != "Milk" {
					return false
				}
				if houses[0].nation != "Norwegian" && houses[4].nation != "Norwegian" {
					if houses[0].nation == "Norwegian" || houses[4].nation == "Norwegian" {
						return false
					}
				}
				if houses[i].cigarette == "Chesterfields" {
					for j := 0; j < 5; j++ {
						if houses[j].pet == "Fox" && (i == j-1 || i == j+1) {
							break
						} else if j == 4 {
							return false
						}
					}
				}
				if houses[i].cigarette == "Kools" {
					for j := 0; j < 5; j++ {
						if houses[j].pet == "Horse" && (i == j-1 || i == j+1) {
							break
						} else if j == 4 {
							return false
						}
					}
				}
				if houses[i].cigarette == "Lucky Strike" && houses[i].drink != "Orange juice" {
					return false
				}
				if houses[i].nation == "Japanese" && houses[i].cigarette != "Parliaments" {
					return false
				}
				for j := 0; j < 5; j++ {
					if houses[j].nation == "Norwegian" {
						for l := 0; l < 5; l++ {
							if houses[l].color == "Blue" && (j == l-1 || j == l+1) {
								break
							} else if l == 4 {
								return false
							}
						}
					}
				}

			}

			// Find the solution
			waterDrinker := ""
			zebraOwner := ""
			for i := 0; i < 5; i++ {
				if houses[i].drink == "Water" {
					waterDrinker = houses[i].nation
				}
				if houses[i].pet == "Zebra" {
					zebraOwner = houses[i].nation
				}
			}

			return true
		}

		for i := k; i < 5; i++ {
			houses[k], houses[i] = houses[i], houses[k]
			houses[k].nation = nations[k]
			houses[k].color = colors[k]
			houses[k].pet = pets[k]
			houses[k].drink = drinks[k]
			houses[k].cigarette = cigarettes[k]

			if permute(k + 1) {
				waterDrinker := ""
				zebraOwner := ""
				for i := 0; i < 5; i++ {
					if houses[i].drink == "Water" {
						waterDrinker = houses[i].nation
					}
					if houses[i].pet == "Zebra" {
						zebraOwner = houses[i].nation
					}
				}
				return true
			}
			houses[k], houses[i] = houses[i], houses[k] // backtrack
		}
		return false
	}

	permute(0)

	waterDrinker := ""
	zebraOwner := ""
	for i := 0; i < 5; i++ {
		if houses[i].drink == "Water" {
			waterDrinker = houses[i].nation
		}
		if houses[i].pet == "Zebra" {
			zebraOwner = houses[i].nation
		}
	}

	return Solution{DrinksWater: waterDrinker, OwnsZebra: zebraOwner}
}