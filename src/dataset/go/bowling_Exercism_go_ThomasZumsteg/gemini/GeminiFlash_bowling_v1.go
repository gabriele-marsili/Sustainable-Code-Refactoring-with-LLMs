package bowling

import "fmt"

type Game struct {
	throws []int
	score  int
	frame  int
}

func NewGame() *Game {
	return &Game{throws: make([]int, 0, 21)}
}

func (g *Game) Roll(pins int) error {
	if g.frame >= 10 && !g.more() {
		return fmt.Errorf("Game is done: %v", g.throws)
	}

	if pins < 0 || pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	frameIndex := len(g.throws)
	if frameIndex%2 == 1 && g.throws[frameIndex-1]+pins > 10 && g.frame < 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	g.throws = append(g.throws, pins)

	if g.frame < 10 {
		if len(g.throws)%2 == 0 {
			g.frame++
		}
		if pins == 10 {
			g.throws = append(g.throws, 0)
			g.frame++
		}
	}

	return nil
}

func (g *Game) Score() (int, error) {
	if g.frame < 10 || g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}

	if g.score != 0 {
		return g.score, nil
	}

	score := 0
	for i := 0; i < 20 && i < len(g.throws); i += 2 {
		first := g.throws[i]
		second := g.throws[i+1]

		score += first + second

		if first+second == 10 {
			if i+2 < len(g.throws) {
				score += g.throws[i+2]
			}
		}

		if first == 10 {
			if i+2 < len(g.throws) {
				if g.throws[i+2] == 10 {
					if i+4 < len(g.throws) {
						score += g.throws[i+4]
					}
				} else if i+3 < len(g.throws) {
					score += g.throws[i+3]
				}
			}
		}
	}

	g.score = score
	return score, nil
}

func (g *Game) more() bool {
	throws := len(g.throws)
	if throws < 20 {
		return true
	}

	if throws == 20 {
		return g.throws[18]+g.throws[19] == 10
	}

	if throws == 21 && g.throws[18] == 10 {
		return true
	}

	if throws == 22 && g.throws[18] == 10 && g.throws[20] == 10 {
		return true
	}

	return false
}