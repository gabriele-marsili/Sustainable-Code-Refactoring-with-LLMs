package dndcharacter

import (
	"math/rand"
)

type Character struct {
	Strength     int
	Dexterity    int
	Constitution int
	Intelligence int
	Wisdom       int
	Charisma     int
	Hitpoints    int
}

// Modifier calculates the ability modifier for a given ability score
func Modifier(score int) int {
	return (score - 10) / 2
}

// Ability uses randomness to generate the score for an ability
func Ability() int {
	rolls := [4]int{
		rand.Intn(6) + 1,
		rand.Intn(6) + 1,
		rand.Intn(6) + 1,
		rand.Intn(6) + 1,
	}
	
	sum := rolls[0] + rolls[1] + rolls[2] + rolls[3]
	min := rolls[0]
	
	for i := 1; i < 4; i++ {
		if rolls[i] < min {
			min = rolls[i]
		}
	}
	
	return sum - min
}

// GenerateCharacter creates a new Character with random scores for abilities
func GenerateCharacter() Character {
	constitution := Ability()

	return Character{
		Strength:     Ability(),
		Dexterity:    Ability(),
		Constitution: constitution,
		Intelligence: Ability(),
		Wisdom:       Ability(),
		Charisma:     Ability(),
		Hitpoints:    10 + Modifier(constitution),
	}
}

// rollDice returns a random number between 1 and 6.
func rollDice() int {
	return rand.Intn(6) + 1
}

func getSum(slice ...int) (sum int) {
	for _, x := range slice {
		sum += x
	}
	return sum
}

func getMin(slice ...int) (minimum int) {
	minimum = slice[0]
	for _, x := range slice {
		if x < minimum {
			minimum = x
		}
	}
	return minimum
}