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
		rolls:    make([]int, 0, 21), // Pre-allocate for max possible rolls
		currentRoll: 0,
	}
}

// Roll records the number of pins knocked down in a roll.
func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.currentRoll >= 21 {
		return errors.New("cannot roll after game is over")
	}
	g.rolls = append(g.rolls, pins)
	g.currentRoll++
	return nil
}

// Score calculates the total score of the game.
func (g *Game) Score() (int, error) {
	if g.currentRoll < 12 && !g.isFinished() {
		return 0, errors.New("game is not yet finished")
	}

	score := 0
	rollIndex := 0
	for frame := 0; frame < 10; frame++ {
		if g.isStrike(rollIndex) {
			score += 10 + g.strikeBonus(rollIndex)
			rollIndex++
		} else if g.isSpare(rollIndex) {
			score += 10 + g.spareBonus(rollIndex)
			rollIndex += 2
		} else {
			score += g.sumOfBallsInFrame(rollIndex)
			rollIndex += 2
		}
	}

	return score, nil
}

func (g *Game) isStrike(rollIndex int) bool {
	return g.rolls[rollIndex] == 10
}

func (g *Game) isSpare(rollIndex int) bool {
	return g.rolls[rollIndex]+g.rolls[rollIndex+1] == 10
}

func (g *Game) strikeBonus(rollIndex int) int {
	return g.rolls[rollIndex+1] + g.rolls[rollIndex+2]
}

func (g *Game) spareBonus(rollIndex int) int {
	return g.rolls[rollIndex+2]
}

func (g *Game) sumOfBallsInFrame(rollIndex int) int {
	return g.rolls[rollIndex] + g.rolls[rollIndex+1]
}

func (g *Game) isFinished() bool {
	if g.currentRoll < 12 {
		return false
	}

	rollIndex := 0
	for frame := 0; frame < 10; frame++ {
		if g.isStrike(rollIndex) {
			if frame == 9 && g.currentRoll < 12 {
				return false
			}
			rollIndex++
		} else if g.isSpare(rollIndex) {
			if frame == 9 && g.currentRoll < 11 {
				return false
			}
			rollIndex += 2
		} else {
			rollIndex += 2
		}
	}
	return true
}