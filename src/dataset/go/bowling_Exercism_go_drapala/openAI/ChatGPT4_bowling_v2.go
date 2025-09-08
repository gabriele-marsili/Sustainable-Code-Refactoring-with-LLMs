package bowling

import "errors"

type Game struct {
	rolls  [21]int
	index  int
	scored bool
	score  int
}

func NewGame() *Game {
	return &Game{}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return errors.New("invalid number of pins")
	}
	if g.index >= len(g.rolls) {
		return errors.New("cannot roll after game is over")
	}
	if g.index > 0 && g.index%2 == 1 && g.rolls[g.index-1]+pins > 10 {
		return errors.New("invalid roll: frame score exceeds 10")
	}
	g.rolls[g.index] = pins
	g.index++
	g.scored = false
	return nil
}

func (g *Game) Score() (int, error) {
	if g.index < 12 && !g.isGameComplete() {
		return 0, errors.New("game is not yet complete")
	}
	if g.scored {
		return g.score, nil
	}
	score := 0
	frameIndex := 0
	for frame := 0; frame < 10; frame++ {
		if g.isStrike(frameIndex) {
			score += 10 + g.strikeBonus(frameIndex)
			frameIndex++
		} else if g.isSpare(frameIndex) {
			score += 10 + g.spareBonus(frameIndex)
			frameIndex += 2
		} else {
			score += g.sumOfPinsInFrame(frameIndex)
			frameIndex += 2
		}
	}
	g.score = score
	g.scored = true
	return score, nil
}

func (g *Game) isStrike(frameIndex int) bool {
	return g.rolls[frameIndex] == 10
}

func (g *Game) isSpare(frameIndex int) bool {
	return g.rolls[frameIndex]+g.rolls[frameIndex+1] == 10
}

func (g *Game) strikeBonus(frameIndex int) int {
	return g.rolls[frameIndex+1] + g.rolls[frameIndex+2]
}

func (g *Game) spareBonus(frameIndex int) int {
	return g.rolls[frameIndex+2]
}

func (g *Game) sumOfPinsInFrame(frameIndex int) int {
	return g.rolls[frameIndex] + g.rolls[frameIndex+1]
}

func (g *Game) isGameComplete() bool {
	frameIndex := 0
	for frame := 0; frame < 10; frame++ {
		if g.isStrike(frameIndex) {
			frameIndex++
		} else {
			frameIndex += 2
		}
		if frameIndex >= g.index {
			return false
		}
	}
	return true
}