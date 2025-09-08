package bowling

import "fmt"

type Game struct {
	throws []int
}

func NewGame() *Game {
	return &Game{make([]int, 0, 22)}
}

func (g *Game) Roll(pins int) error {
	if !g.more() {
		return fmt.Errorf("Game is done: %v", g.throws)
	}
	
	if pins < 0 || pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}
	
	throwsLen := len(g.throws)
	if throwsLen%2 == 1 && g.throws[throwsLen-1]+pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}
	
	g.throws = append(g.throws, pins)
	if pins == 10 {
		g.throws = append(g.throws, 0)
	}
	return nil
}

func (g *Game) Score() (int, error) {
	if g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}
	
	total := 0
	throws := g.throws
	
	for t := 0; t < 20; t += 2 {
		first := throws[t]
		second := throws[t+1]
		frameScore := first + second
		total += frameScore
		
		if frameScore == 10 {
			total += throws[t+2]
		}
		if first == 10 {
			if throws[t+2] == 10 {
				total += throws[t+4]
			} else {
				total += throws[t+3]
			}
		}
	}
	return total, nil
}

func (g *Game) more() bool {
	throwsLen := len(g.throws)
	
	if throwsLen < 20 {
		return true
	}
	if throwsLen == 20 {
		return g.throws[18]+g.throws[19] == 10
	}
	if throwsLen == 21 {
		return g.throws[18] == 10
	}
	if throwsLen == 22 {
		return g.throws[18] == 10 && g.throws[20] == 10
	}
	return false
}