package bowling

import "fmt"

type Game struct {
	throws []int
}

func NewGame() *Game {
	throws := make([]int, 0, 21)
	return &Game{throws: throws}
}

func (g *Game) Roll(pins int) error {
	throws := len(g.throws)
	if throws >= 21 {
		if throws == 21 && g.throws[18] != 10 {
			return fmt.Errorf("Game is done: %v", g.throws)
		}
		if throws == 21 && g.throws[18] == 10 && g.throws[20] != 10 {
			return fmt.Errorf("Game is done: %v", g.throws)
		}
		if throws == 22 && g.throws[18] == 10 && g.throws[20] == 10 {
			return nil
		}
		return fmt.Errorf("Game is done: %v", g.throws)
	}

	if pins < 0 || pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	if throws%2 == 1 && g.throws[throws-1]+pins > 10 && g.throws[throws-1] != 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	g.throws = append(g.throws, pins)
	if pins == 10 && throws < 20 {
		g.throws = append(g.throws, 0)
	}
	return nil
}

func (g *Game) Score() (int, error) {
	throws := len(g.throws)
	if throws < 20 {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}

	if throws == 20 && (g.throws[18]+g.throws[19] == 10 || g.throws[18] == 10) {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}

	if throws == 21 && g.throws[18] == 10 {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}

	score := 0
	for i := 0; i < 10; i++ {
		frameStart := i * 2
		first := g.throws[frameStart]
		second := g.throws[frameStart+1]

		if first == 10 {
			score += 10
			if frameStart+2 < len(g.throws) {
				score += g.throws[frameStart+2]
			}
			if frameStart+4 < len(g.throws) && g.throws[frameStart+2] == 10 {
				score += g.throws[frameStart+4]
			} else if frameStart+3 < len(g.throws) {
				score += g.throws[frameStart+3]
			}
		} else if first+second == 10 {
			score += 10 + g.throws[frameStart+2]
		} else {
			score += first + second
		}
	}

	return score, nil
}

func (g *Game) more() bool {
	throws := len(g.throws)
	if throws >= 21 {
		if throws == 21 && g.throws[18] != 10 {
			return false
		}
		if throws == 21 && g.throws[18] == 10 && g.throws[20] != 10 {
			return false
		}
		if throws == 22 && g.throws[18] == 10 && g.throws[20] == 10 {
			return true
		}
		return false
	}
	return throws < 20
}