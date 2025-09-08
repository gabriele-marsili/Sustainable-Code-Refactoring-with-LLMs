package bowling

import "fmt"

type Game struct {
	throws    []int
	rollCount int
	gameOver  bool
}

func NewGame() *Game {
	return &Game{
		throws: make([]int, 0, 22),
	}
}

func (g *Game) Roll(pins int) error {
	if g.gameOver || !g.more() {
		return fmt.Errorf("Game is done: %v", g.throws)
	}
	
	if pins < 0 || pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}
	
	if g.rollCount%2 == 1 && g.rollCount < 18 && g.throws[g.rollCount-1]+pins > 10 {
		return fmt.Errorf("Invalid number of pins: %v, %d", g.throws, pins)
	}
	
	g.throws = append(g.throws, pins)
	g.rollCount++
	
	if pins == 10 && g.rollCount < 19 && g.rollCount%2 == 1 {
		g.throws = append(g.throws, 0)
		g.rollCount++
	}
	
	if !g.more() {
		g.gameOver = true
	}
	
	return nil
}

func (g *Game) Score() (int, error) {
	if !g.gameOver && g.more() {
		return 0, fmt.Errorf("Game is not done yet: %v", g.throws)
	}
	
	total := 0
	for t := 0; t < 20; t += 2 {
		first := g.throws[t]
		second := g.throws[t+1]
		frameScore := first + second
		total += frameScore
		
		if frameScore == 10 {
			total += g.throws[t+2]
		}
		
		if first == 10 {
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
	switch {
	case g.rollCount < 20:
		return true
	case g.rollCount == 20:
		return g.throws[18]+g.throws[19] == 10
	case g.rollCount == 21:
		return g.throws[18] == 10
	case g.rollCount == 22:
		return g.throws[18] == 10 && g.throws[20] == 10
	default:
		return false
	}
}