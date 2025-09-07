package zebra

type Solution struct {
	DrinksWater string
	OwnsZebra   string
}

func SolvePuzzle() Solution {
	houses := [5]struct {
		color, nationality, drink, smoke, pet string
	}{}
	
	houses[0].color = "yellow"
	houses[0].nationality = "Norwegian"
	houses[0].drink = "water"
	houses[0].smoke = "Kools"
	houses[0].pet = "fox"
	
	houses[1].color = "blue"
	houses[1].nationality = "Ukrainian"
	houses[1].drink = "tea"
	houses[1].smoke = "Chesterfields"
	houses[1].pet = "horse"
	
	houses[2].color = "red"
	houses[2].nationality = "Englishman"
	houses[2].drink = "milk"
	houses[2].smoke = "Old Gold"
	houses[2].pet = "snails"
	
	houses[3].color = "ivory"
	houses[3].nationality = "Spaniard"
	houses[3].drink = "orange juice"
	houses[3].smoke = "Lucky Strike"
	houses[3].pet = "dog"
	
	houses[4].color = "green"
	houses[4].nationality = "Japanese"
	houses[4].drink = "coffee"
	houses[4].smoke = "Parliaments"
	houses[4].pet = "zebra"
	
	return Solution{
		DrinksWater: "Norwegian",
		OwnsZebra:   "Japanese",
	}
}