package bowling

import "fmt"

type Game struct {
	throws [21]int
	index  int
}

func NewGame() *Game {
	return &Game{}
}

func (g *Game) Roll(pins int) error {
	if !g.more() {
		return fmt.Errorf("Game is done: %v", g.throws[:g.index])
	}
	if pins < 0 || pins > 10 || (g.index%2 == 1 && g.throws[g.index-1]+pins > 10 && g.throws[g.index-1] != 10) {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws[:g.index], pins)
	}
	g.throws[g.index] = pins
	g.index++
	if pins == 10 && g.index%2 == 1 && g.index < 20 {
		g.throws[g.index] = 0
		g.index++
	}
	return nil
}

func (g *Game) Score() (int, error) {
	if g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws[:g.index])
	}
	total := 0
	for t := 0; t < 20; t += 2 {
		first, second := g.throws[t], g.throws[t+1]
		total += first + second
		if first+second == 10 {
			total += g.throws[t+2]
		}
		if first == 10 {
			total += g.throws[t+2]
			if g.throws[t+2] == 10 {
				total += g.throws[t+4]
			} else {
				total += g.throws[t+3]
			}
		}
	}
	return total, nil
}

func (g *Game) more() bool {
	switch g.index {
	case 0, 2, 4, 6, 8, 10, 12, 14, 16, 18:
		return true
	case 20:
		return g.throws[18]+g.throws[19] == 10
	case 21:
		return g.throws[18] == 10
	case 22:
		return g.throws[18] == 10 && g.throws[20] == 10
	default:
		return false
	}
}