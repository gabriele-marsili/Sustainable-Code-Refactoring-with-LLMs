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
	if frameIndex%2 == 1 && g.frame < 10 && g.throws[frameIndex-1]+pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}

	g.throws = append(g.throws, pins)

	if pins == 10 && g.frame < 10 {
		g.throws = append(g.throws, 0)
	}

	if len(g.throws)%2 == 0 && g.frame < 10 {
		g.frame++
	} else if pins == 10 && g.frame < 10 {
		g.frame++
	} else if g.frame >= 10 && !g.more() {
		g.frame++
	}

	return nil
}

func (g *Game) Score() (int, error) {
	if g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}

	score := 0
	throws := g.throws
	throwIndex := 0

	for frame := 0; frame < 10; frame++ {
		if throws[throwIndex] == 10 {
			score += 10 + throws[throwIndex+2] + throws[throwIndex+3]
			throwIndex += 2
		} else if throws[throwIndex]+throws[throwIndex+1] == 10 {
			score += 10 + throws[throwIndex+2]
			throwIndex += 2
		} else {
			score += throws[throwIndex] + throws[throwIndex+1]
			throwIndex += 2
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
		return g.throws[18]+g.throws[19] == 10 || g.throws[18] == 10
	case throws == 21:
		return g.throws[18] == 10
	case throws == 22 && g.throws[18] == 10 && g.throws[20] == 10:
		return true
	default:
		return false
	}
}