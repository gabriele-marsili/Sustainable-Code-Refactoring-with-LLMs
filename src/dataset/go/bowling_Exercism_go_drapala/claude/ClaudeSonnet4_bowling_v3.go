package bowling

import "errors"

type Game struct {
	rolls []int
	roll  int
}

func NewGame() *Game {
	return &Game{
		rolls: make([]int, 0, 21),
		roll:  0,
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	
	if g.roll >= 21 {
		return errors.New("game is over")
	}
	
	g.rolls = append(g.rolls, pins)
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
		if rollIndex >= len(g.rolls) {
			return 0, errors.New("incomplete game")
		}
		
		if g.isStrike(rollIndex) {
			if frame == 9 {
				if rollIndex+2 >= len(g.rolls) {
					return 0, errors.New("incomplete game")
				}
				score += 10 + g.rolls[rollIndex+1] + g.rolls[rollIndex+2]
			} else {
				if rollIndex+2 >= len(g.rolls) {
					return 0, errors.New("incomplete game")
				}
				score += 10 + g.rolls[rollIndex+1] + g.rolls[rollIndex+2]
			}
			rollIndex++
		} else if g.isSpare(rollIndex) {
			if frame == 9 {
				if rollIndex+2 >= len(g.rolls) {
					return 0, errors.New("incomplete game")
				}
				score += 10 + g.rolls[rollIndex+2]
			} else {
				if rollIndex+2 >= len(g.rolls) {
					return 0, errors.New("incomplete game")
				}
				score += 10 + g.rolls[rollIndex+2]
			}
			rollIndex += 2
		} else {
			if rollIndex+1 >= len(g.rolls) {
				return 0, errors.New("incomplete game")
			}
			score += g.rolls[rollIndex] + g.rolls[rollIndex+1]
			rollIndex += 2
		}
	}
	
	return score, nil
}

func (g *Game) isStrike(rollIndex int) bool {
	return g.rolls[rollIndex] == 10
}

func (g *Game) isSpare(rollIndex int) bool {
	return rollIndex+1 < len(g.rolls) && g.rolls[rollIndex]+g.rolls[rollIndex+1] == 10
}