package bowling

import "fmt"

type Game struct {
	throws []int
	score  int
	frame  int
}

func NewGame() *Game {
	return &Game{throws: make([]int, 0, 21), score: 0, frame: 0}
}

func (g *Game) Roll(pins int) error {
	if g.frame >= 10 && !g.more() {
		return fmt.Errorf("Game is done: %v", g.throws)
	}
	if pins < 0 || pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	if len(g.throws)%2 == 1 && g.frame < 10 && g.throws[len(g.throws)-1]+pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	g.throws = append(g.throws, pins)

	if pins == 10 && g.frame < 10 {
		g.throws = append(g.throws, 0)
	}

	g.frame = (len(g.throws) + 1) / 2

	return nil
}

func (g *Game) Score() (int, error) {
	if g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}

	score := 0
	for i := 0; i < len(g.throws); {
		if i >= 20 {
			break
		}
		frameScore := g.throws[i] + g.throws[i+1]

		if g.throws[i] == 10 {
			if i+2 < len(g.throws) {
				score += g.throws[i+2]
			}
			if i+3 < len(g.throws) && g.throws[i+2] == 10 {
				score += g.throws[i+4]
			} else if i+3 < len(g.throws) {
				score += g.throws[i+3]
			}
			score += frameScore
			i += 2
		} else if frameScore == 10 {
			if i+2 < len(g.throws) {
				score += g.throws[i+2]
			}
			score += frameScore
			i += 2
		} else {
			score += frameScore
			i += 2
		}
	}

	return score, nil
}

func (g *Game) more() bool {
	throws := len(g.throws)
	switch {
	case throws < 20:
		return true
	case throws == 20:
		return g.throws[18]+g.throws[19] == 10
	case throws == 21:
		return g.throws[18] == 10
	case throws == 22 && g.throws[18] == 10 && g.throws[20] == 10:
		return true
	default:
		return false
	}
}