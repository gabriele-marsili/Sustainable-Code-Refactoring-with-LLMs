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
	return g.updateFrames(pins)
}

func (g *Game) updateFrames(pins int) error {
	if len(g.frames) == 0 || g.lastFrame().isComplete {
		if len(g.frames) >= 10 && g.frames[9].isComplete {
			if len(g.frames) == 10 && !g.frames[9].isStrike() && !g.frames[9].isSpare() {
				return fmt.Errorf("cannot roll after game is over")
			}
			if len(g.frames) == 11 && g.frames[9].isSpare() {
				return fmt.Errorf("cannot roll after bonus roll for spare")
			}
			if len(g.frames) == 11 && g.frames[9].isStrike() && g.frames[10].isComplete {
				return fmt.Errorf("cannot roll after bonus roll for strike")
			}
		}
		g.frames = append(g.frames, &Frame{rollOne: pins, isComplete: pins == 10})
	} else {
		frame := g.lastFrame()
		if frame.rollOne+pins > 10 {
			return fmt.Errorf("second roll hit more than number of pins on the lane")
		}
		frame.rollTwo = pins
		frame.isComplete = true
	}
	return nil
}

func (g *Game) Score() (int, error) {
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

func (g *Game) lastFrame() *Frame {
	return g.frames[len(g.frames)-1]
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
	nextRolls := collectNextRolls(nextFrames, 2)
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
	return !f.isStrike() && f.rollOne+f.rollTwo == 10
}

func (f *Frame) isOpenFrame() bool {
	return !f.isStrike() && !f.isSpare()
}

func collectNextRolls(nextFrames []*Frame, count int) []int {
	rolls := make([]int, 0, count)
	for _, frame := range nextFrames {
		if len(rolls) >= count {
			break
		}
		rolls = append(rolls, frame.rollOne)
		if !frame.isStrike() && len(rolls) < count {
			rolls = append(rolls, frame.rollTwo)
		}
	}
	return rolls
}