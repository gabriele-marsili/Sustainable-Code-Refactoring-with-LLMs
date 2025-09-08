package bowling

import "fmt"

type Game struct {
	throws []int
	done   bool
}

func NewGame() *Game {
	return &Game{throws: make([]int, 0, 21)}
}

func (g *Game) Roll(pins int) error {
	if g.done {
		return fmt.Errorf("Game is done: %v", g.throws)
	}
	if pins < 0 || pins > 10 || (len(g.throws)%2 == 1 && g.throws[len(g.throws)-1]+pins > 10) {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}
	g.throws = append(g.throws, pins)
	if pins == 10 && len(g.throws)%2 == 1 && len(g.throws) < 20 {
		g.throws = append(g.throws, 0)
	}
	g.done = !g.more()
	return nil
}

func (g *Game) Score() (int, error) {
	if !g.done {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}
	total := 0
	for t := 0; t < 20; t += 2 {
		first, second := g.throws[t], g.throws[t+1]
		total += first + second
		if first == 10 { // Strike
			total += g.throws[t+2] + g.throws[t+3]
		} else if first+second == 10 { // Spare
			total += g.throws[t+2]
		}
	}
	return total, nil
}

func (g *Game) more() bool {
	throws := len(g.throws)
	if throws < 20 {
		return true
	}
	if throws == 20 {
		return g.throws[18]+g.throws[19] == 10
	}
	return throws < 22 && g.throws[18] == 10
}