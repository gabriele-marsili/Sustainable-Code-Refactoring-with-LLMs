package bowling

import "errors"

type Game struct {
	rolls     [21]int
	rollIndex int
}

func NewGame() *Game {
	return &Game{}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.rollIndex >= 21 {
		return errors.New("game is over")
	}
	g.rolls[g.rollIndex] = pins
	g.rollIndex++
	return nil
}

func (g *Game) Score() (int, error) {
	if g.rollIndex == 0 {
		return 0, nil
	}
	
	score := 0
	rollIdx := 0
	
	for frame := 0; frame < 10; frame++ {
		if rollIdx >= g.rollIndex {
			break
		}
		
		if g.rolls[rollIdx] == 10 {
			score += 10
			if rollIdx+1 < g.rollIndex {
				score += g.rolls[rollIdx+1]
			}
			if rollIdx+2 < g.rollIndex {
				score += g.rolls[rollIdx+2]
			}
			rollIdx++
		} else if rollIdx+1 < g.rollIndex && g.rolls[rollIdx]+g.rolls[rollIdx+1] == 10 {
			score += 10
			if rollIdx+2 < g.rollIndex {
				score += g.rolls[rollIdx+2]
			}
			rollIdx += 2
		} else {
			score += g.rolls[rollIdx]
			if rollIdx+1 < g.rollIndex {
				score += g.rolls[rollIdx+1]
			}
			rollIdx += 2
		}
	}
	
	return score, nil
}