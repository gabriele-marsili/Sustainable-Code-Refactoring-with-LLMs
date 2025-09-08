package bowling

import (
	"fmt"
)

type Game struct {
	frames []*Frame
	rolls  []int
}

func NewGame() *Game {
	return &Game{}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return fmt.Errorf("invalid roll: %d", pins)
	}
	g.rolls = append(g.rolls, pins)
	return g.parseFrames()
}

func (g *Game) parseFrames() error {
	g.frames = nil
	frameCount := 0
	for i := 0; i < len(g.rolls); {
		if frameCount == 10 {
			if !g.frames[9].isStrike() && !g.frames[9].isSpare() {
				return fmt.Errorf("cannot roll after game is over")
			}
			if len(g.rolls[i:]) > 2 || (g.frames[9].isSpare() && len(g.rolls[i:]) > 1) {
				return fmt.Errorf("cannot roll after bonus rolls")
			}
			break
		}

		rollOne := g.rolls[i]
		if rollOne == 10 {
			g.frames = append(g.frames, &Frame{rollOne, 0, true})
			i++
		} else {
			if i+1 >= len(g.rolls) {
				g.frames = append(g.frames, &Frame{rollOne, 0, false})
				break
			}
			rollTwo := g.rolls[i+1]
			if rollOne+rollTwo > 10 {
				return fmt.Errorf("invalid frame: %d + %d exceeds 10", rollOne, rollTwo)
			}
			g.frames = append(g.frames, &Frame{rollOne, rollTwo, true})
			i += 2
		}
		frameCount++
	}
	return nil
}

func (g *Game) Score() (int, error) {
	if err := g.parseFrames(); err != nil {
		return 0, err
	}
	if len(g.frames) < 10 {
		return 0, fmt.Errorf("not enough frames")
	}

	total := 0
	for i := 0; i < 10; i++ {
		score, err := g.frames[i].score(g.frames[i+1:])
		if err != nil {
			return 0, err
		}
		total += score
	}
	return total, nil
}

type Frame struct {
	rollOne    int
	rollTwo    int
	isComplete bool
}

func (f *Frame) score(nextFrames []*Frame) (int, error) {
	if f.isOpenFrame() {
		return f.rollOne + f.rollTwo, nil
	}
	nextRolls := nextRolls(nextFrames)
	if f.isSpare() {
		if len(nextRolls) < 1 {
			return 0, fmt.Errorf("not enough rolls after spare")
		}
		return 10 + nextRolls[0], nil
	}
	if f.isStrike() {
		if len(nextRolls) < 2 {
			return 0, fmt.Errorf("not enough rolls after strike")
		}
		return 10 + nextRolls[0] + nextRolls[1], nil
	}
	return 0, fmt.Errorf("invalid frame state")
}

func (f *Frame) isStrike() bool {
	return f.rollOne == 10
}

func (f *Frame) isSpare() bool {
	return f.rollOne+f.rollTwo == 10 && f.rollOne != 10
}

func (f *Frame) isOpenFrame() bool {
	return f.rollOne+f.rollTwo < 10
}

func nextRolls(nextFrames []*Frame) []int {
	rolls := make([]int, 0, len(nextFrames)*2)
	for _, frame := range nextFrames {
		rolls = append(rolls, frame.rollOne)
		if !frame.isStrike() {
			rolls = append(rolls, frame.rollTwo)
		}
	}
	return rolls
}