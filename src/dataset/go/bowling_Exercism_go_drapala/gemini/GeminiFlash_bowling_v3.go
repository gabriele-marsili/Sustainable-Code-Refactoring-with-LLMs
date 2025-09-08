package bowling

import "errors"

// Game represents a bowling game.
type Game struct {
	rolls    []int
	rollIdx  int
	isFinished bool
}

// NewGame creates a new bowling game.
func NewGame() *Game {
	return &Game{
		rolls:    make([]int, 21), // Max 21 rolls in a game
		rollIdx:  0,
		isFinished: false,
	}
}

// Roll records the number of pins knocked down in a roll.
func (g *Game) Roll(pins int) error {
	if g.isFinished {
		return errors.New("cannot roll after game is finished")
	}
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}

	g.rolls[g.rollIdx] = pins
	g.rollIdx++

	if g.rollIdx > 20 {
		g.isFinished = true
	}

	return nil
}

// Score calculates the score of the game.
func (g *Game) Score() (int, error) {
	if g.rollIdx < 12 { // Minimum rolls to have a valid score
		return 0, errors.New("game is not yet complete")
	}

	score := 0
	frameIndex := 0

	for frame := 0; frame < 10; frame++ {
		if isStrike(g.rolls, frameIndex) {
			score += 10 + strikeBonus(g.rolls, frameIndex)
			frameIndex++
		} else if isSpare(g.rolls, frameIndex) {
			score += 10 + spareBonus(g.rolls, frameIndex)
			frameIndex += 2
		} else {
			score += sumOfBallsInFrame(g.rolls, frameIndex)
			frameIndex += 2
		}
	}

	return score, nil
}

func isStrike(rolls []int, frameIndex int) bool {
	return rolls[frameIndex] == 10
}

func isSpare(rolls []int, frameIndex int) bool {
	return rolls[frameIndex]+rolls[frameIndex+1] == 10
}

func strikeBonus(rolls []int, frameIndex int) int {
	return rolls[frameIndex+1] + rolls[frameIndex+2]
}

func spareBonus(rolls []int, frameIndex int) int {
	return rolls[frameIndex+2]
}

func sumOfBallsInFrame(rolls []int, frameIndex int) int {
	return rolls[frameIndex] + rolls[frameIndex+1]
}