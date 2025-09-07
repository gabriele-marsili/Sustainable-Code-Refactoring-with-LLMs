package dndcharacter

import (
	"math"
	"math/rand"
	"sort"
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
	rolls := [4]int{rollDice(), rollDice(), rollDice(), rollDice()}
	sort.Ints(rolls[:])
	return rolls[1] + rolls[2] + rolls[3]
}

// GenerateCharacter creates a new Character with random scores for abilities
func GenerateCharacter() Character {
	strength := Ability()
	dexterity := Ability()
	constitution := Ability()
	intelligence := Ability()
	wisdom := Ability()
	charisma := Ability()

	return Character{
		Strength:     strength,
		Dexterity:    dexterity,
		Constitution: constitution,
		Intelligence: intelligence,
		Wisdom:       wisdom,
		Charisma:     charisma,
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