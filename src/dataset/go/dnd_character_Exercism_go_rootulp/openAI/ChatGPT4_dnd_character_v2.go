package dndcharacter

import (
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
	rolls := []int{rollDice(), rollDice(), rollDice(), rollDice()}
	sort.Ints(rolls)
	return rolls[1] + rolls[2] + rolls[3]
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