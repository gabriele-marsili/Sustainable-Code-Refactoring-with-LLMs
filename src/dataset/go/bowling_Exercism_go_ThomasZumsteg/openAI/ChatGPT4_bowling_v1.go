package bowling

import "fmt"

type Game struct {
	throws [21]int
	count  int
}

func NewGame() *Game {
	return &Game{}
}

func (g *Game) Roll(pins int) error {
	if g.count >= 21 || !g.more() {
		return fmt.Errorf("Game is done: %v", g.throws[:g.count])
	}
	if pins < 0 || pins > 10 || (g.count%2 == 1 && g.throws[g.count-1] != 10 && g.throws[g.count-1]+pins > 10) {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws[:g.count], pins)
	}
	g.throws[g.count] = pins
	g.count++
	if pins == 10 && g.count%2 == 1 && g.count < 20 {
		g.throws[g.count] = 0
		g.count++
	}
	return nil
}

func (g *Game) Score() (int, error) {
	if g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws[:g.count])
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
	switch g.count {
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