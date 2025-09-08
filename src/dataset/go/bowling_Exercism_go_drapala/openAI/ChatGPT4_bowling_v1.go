package bowling

import "errors"

// Game represents a bowling game
type Game struct {
	rolls  [21]int
	rollIdx int
}

// NewGame initializes a new Game instance
func NewGame() *Game {
	return &Game{}
}

// Roll records the number of pins knocked down in a roll
func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.rollIdx >= len(g.rolls) {
		return errors.New("cannot roll, game is over")
	}
	g.rolls[g.rollIdx] = pins
	g.rollIdx++
	return nil
}

// Score calculates the total score for the game
func (g *Game) Score() (int, error) {
	score := 0
	rollIdx := 0

	for frame := 0; frame < 10; frame++ {
		if rollIdx >= len(g.rolls) {
			return 0, errors.New("incomplete game")
		}

		if g.isStrike(rollIdx) { // Strike
			if rollIdx+2 >= len(g.rolls) {
				return 0, errors.New("incomplete game")
			}
			score += 10 + g.rolls[rollIdx+1] + g.rolls[rollIdx+2]
			rollIdx++
		} else if g.isSpare(rollIdx) { // Spare
			if rollIdx+2 >= len(g.rolls) {
				return 0, errors.New("incomplete game")
			}
			score += 10 + g.rolls[rollIdx+2]
			rollIdx += 2
		} else { // Open frame
			if rollIdx+1 >= len(g.rolls) {
				return 0, errors.New("incomplete game")
			}
			score += g.rolls[rollIdx] + g.rolls[rollIdx+1]
			rollIdx += 2
		}
	}

	return score, nil
}

// isStrike checks if the roll is a strike
func (g *Game) isStrike(rollIdx int) bool {
	return g.rolls[rollIdx] == 10
}

// isSpare checks if the frame is a spare
func (g *Game) isSpare(rollIdx int) bool {
	return g.rolls[rollIdx]+g.rolls[rollIdx+1] == 10
}