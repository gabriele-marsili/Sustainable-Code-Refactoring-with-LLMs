package bowling

import "errors"

type Game struct {
	rolls  [21]int
	index  int
	scored bool
	score  int
}

func NewGame() *Game {
	return &Game{}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.index >= len(g.rolls) {
		return errors.New("no more rolls allowed")
	}
	g.rolls[g.index] = pins
	g.index++
	g.scored = false
	return nil
}

func (g *Game) Score() (int, error) {
	if g.index < 12 && !g.scored {
		return 0, errors.New("game is not yet complete")
	}
	if g.scored {
		return g.score, nil
	}

	score := 0
	frameIndex := 0
	for frame := 0; frame < 10; frame++ {
		if g.rolls[frameIndex] == 10 { // Strike
			score += 10 + g.rolls[frameIndex+1] + g.rolls[frameIndex+2]
			frameIndex++
		} else if g.rolls[frameIndex]+g.rolls[frameIndex+1] == 10 { // Spare
			score += 10 + g.rolls[frameIndex+2]
			frameIndex += 2
		} else { // Open frame
			score += g.rolls[frameIndex] + g.rolls[frameIndex+1]
			frameIndex += 2
		}
	}

	g.score = score
	g.scored = true
	return score, nil
}