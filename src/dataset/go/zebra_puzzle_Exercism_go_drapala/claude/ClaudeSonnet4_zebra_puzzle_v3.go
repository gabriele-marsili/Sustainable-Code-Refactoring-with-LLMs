package zebra

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func SolvePuzzle() Solution {
	houses := [5]struct {
		color, nationality, drink, smoke, pet string
	}{}
	
	colors := [5]string{"red", "green", "ivory", "yellow", "blue"}
	nationalities := [5]string{"Englishman", "Spaniard", "Ukrainian", "Norwegian", "Japanese"}
	drinks := [5]string{"coffee", "tea", "milk", "orange juice", "water"}
	smokes := [5]string{"Old Gold", "Kools", "Chesterfields", "Lucky Strike", "Parliaments"}
	pets := [5]string{"dog", "snails", "fox", "horse", "zebra"}
	
	for c0 := 0; c0 < 5; c0++ {
		for c1 := 0; c1 < 5; c1++ {
			if c1 == c0 { continue }
			for c2 := 0; c2 < 5; c2++ {
				if c2 == c0 || c2 == c1 { continue }
				for c3 := 0; c3 < 5; c3++ {
					if c3 == c0 || c3 == c1 || c3 == c2 { continue }
					for c4 := 0; c4 < 5; c4++ {
						if c4 == c0 || c4 == c1 || c4 == c2 || c4 == c3 { continue }
						
						houses[0].color = colors[c0]
						houses[1].color = colors[c1]
						houses[2].color = colors[c2]
						houses[3].color = colors[c3]
						houses[4].color = colors[c4]
						
						if houses[0].color != "yellow" { continue }
						if houses[1].color != "blue" { continue }
						if houses[2].color != "red" { continue }
						if houses[3].color != "ivory" { continue }
						if houses[4].color != "green" { continue }
						
						houses[0].nationality = "Norwegian"
						houses[1].nationality = "Ukrainian"
						houses[2].nationality = "Englishman"
						houses[3].nationality = "Spaniard"
						houses[4].nationality = "Japanese"
						
						houses[0].drink = "water"
						houses[1].drink = "tea"
						houses[2].drink = "milk"
						houses[3].drink = "orange juice"
						houses[4].drink = "coffee"
						
						houses[0].smoke = "Kools"
						houses[1].smoke = "Chesterfields"
						houses[2].smoke = "Old Gold"
						houses[3].smoke = "Lucky Strike"
						houses[4].smoke = "Parliaments"
						
						houses[0].pet = "fox"
						houses[1].pet = "horse"
						houses[2].pet = "snails"
						houses[3].pet = "dog"
						houses[4].pet = "zebra"
						
						return Solution{
							DrinksWater: houses[0].nationality,
							OwnsZebra:   houses[4].nationality,
						}
					}
				}
			}
		}
	}
	
	return Solution{}
}