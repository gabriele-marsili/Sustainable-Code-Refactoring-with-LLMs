package bowling

import (
	"errors"
)

type Game struct {
	rolls    []int
	rollIdx  int
	complete bool
}

func NewGame() *Game {
	return &Game{
		rolls: make([]int, 0, 21),
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 {
		return errors.New("negative roll is invalid")
	}
	if pins > 10 {
		return errors.New("roll can not hit more than 10 pins")
	}
	
	if g.complete {
		return errors.New("cannot roll after game is over")
	}
	
	if len(g.rolls) > 0 {
		frame := g.rollIdx / 2
		rollInFrame := g.rollIdx % 2
		
		if frame < 9 {
			if rollInFrame == 1 && g.rolls[g.rollIdx-1]+pins > 10 {
				return errors.New("second roll hit more than number of pins on the lane")
			}
		} else if frame == 9 {
			if rollInFrame == 1 && g.rolls[g.rollIdx-1] != 10 && g.rolls[g.rollIdx-1]+pins > 10 {
				return errors.New("second roll hit more than number of pins on the lane")
			}
		}
	}
	
	g.rolls = append(g.rolls, pins)
	
	frame := g.rollIdx / 2
	rollInFrame := g.rollIdx % 2
	
	if frame < 9 {
		if pins == 10 || rollInFrame == 1 {
			g.rollIdx += 2
		} else {
			g.rollIdx++
		}
	} else if frame == 9 {
		if rollInFrame == 0 {
			if pins == 10 {
				g.rollIdx++
			} else {
				g.rollIdx++
			}
		} else if rollInFrame == 1 {
			if g.rolls[g.rollIdx-1] == 10 || g.rolls[g.rollIdx-1]+pins == 10 {
				g.rollIdx++
			} else {
				g.complete = true
			}
		} else {
			g.complete = true
		}
	}
	
	return nil
}

func (g *Game) Score() (int, error) {
	if len(g.rolls) == 0 {
		return 0, errors.New("not enough frames")
	}
	
	rollIdx := 0
	total := 0
	
	for frame := 0; frame < 10; frame++ {
		if rollIdx >= len(g.rolls) {
			return 0, errors.New("not enough frames")
		}
		
		if g.rolls[rollIdx] == 10 {
			if rollIdx+2 >= len(g.rolls) {
				return 0, errors.New("not enough rolls after strike")
			}
			total += 10 + g.rolls[rollIdx+1] + g.rolls[rollIdx+2]
			rollIdx++
		} else if g.rolls[rollIdx]+g.rolls[rollIdx+1] == 10 {
			if rollIdx+2 >= len(g.rolls) {
				return 0, errors.New("not enough rolls after spare")
			}
			total += 10 + g.rolls[rollIdx+2]
			rollIdx += 2
		} else {
			total += g.rolls[rollIdx] + g.rolls[rollIdx+1]
			rollIdx += 2
		}
	}
	
	return total, nil
}