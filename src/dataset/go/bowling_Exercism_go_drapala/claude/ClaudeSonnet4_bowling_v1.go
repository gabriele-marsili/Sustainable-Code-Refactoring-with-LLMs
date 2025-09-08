package bowling

import "errors"

type Game struct {
	rolls []int
	roll  int
}

func NewGame() *Game {
	return &Game{
		rolls: make([]int, 21), // Pre-allocate max possible rolls
		roll:  0,
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.roll >= 21 {
		return errors.New("game over")
	}
	g.rolls[g.roll] = pins
	g.roll++
	return nil
}

func (g *Game) Score() (int, error) {
	if g.roll == 0 {
		return 0, nil
	}
	
	score := 0
	rollIndex := 0
	
	for frame := 0; frame < 10; frame++ {
		if rollIndex >= g.roll {
			break
		}
		
		if g.rolls[rollIndex] == 10 { // Strike
			score += 10
			if rollIndex+1 < g.roll {
				score += g.rolls[rollIndex+1]
			}
			if rollIndex+2 < g.roll {
				score += g.rolls[rollIndex+2]
			}
			rollIndex++
		} else if rollIndex+1 < g.roll && g.rolls[rollIndex]+g.rolls[rollIndex+1] == 10 { // Spare
			score += 10
			if rollIndex+2 < g.roll {
				score += g.rolls[rollIndex+2]
			}
			rollIndex += 2
		} else { // Regular frame
			score += g.rolls[rollIndex]
			if rollIndex+1 < g.roll {
				score += g.rolls[rollIndex+1]
			}
			rollIndex += 2
		}
	}
	
	return score, nil
}