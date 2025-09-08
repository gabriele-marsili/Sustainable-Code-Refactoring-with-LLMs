package bowling

import "errors"

// Game represents a bowling game.
type Game struct {
	rolls    []int
	currentRoll int
}

// NewGame creates a new bowling game.
func NewGame() *Game {
	return &Game{
		rolls:    make([]int, 21), // Maximum possible rolls in a game
		currentRoll: 0,
	}
}

// Roll records the number of pins knocked down in a roll.
func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.currentRoll >= 21 {
		return errors.New("game is over")
	}
	g.rolls[g.currentRoll] = pins
	g.currentRoll++
	return nil
}

// Score calculates the score of the game.
func (g *Game) Score() (int, error) {
	score := 0
	rollIndex := 0
	for frame := 0; frame < 10; frame++ {
		if isStrike(g.rolls, rollIndex) {
			score += 10 + strikeBonus(g.rolls, rollIndex)
			rollIndex++
		} else if isSpare(g.rolls, rollIndex) {
			score += 10 + spareBonus(g.rolls, rollIndex)
			rollIndex += 2
		} else {
			score += sumOfBallsInFrame(g.rolls, rollIndex)
			rollIndex += 2
		}
	}
	return score, nil
}

func isStrike(rolls []int, rollIndex int) bool {
	return rolls[rollIndex] == 10
}

func isSpare(rolls []int, rollIndex int) bool {
	return rolls[rollIndex]+rolls[rollIndex+1] == 10
}

func sumOfBallsInFrame(rolls []int, rollIndex int) int {
	return rolls[rollIndex] + rolls[rollIndex+1]
}

func strikeBonus(rolls []int, rollIndex int) int {
	return rolls[rollIndex+1] + rolls[rollIndex+2]
}

func spareBonus(rolls []int, rollIndex int) int {
	return rolls[rollIndex+2]
}