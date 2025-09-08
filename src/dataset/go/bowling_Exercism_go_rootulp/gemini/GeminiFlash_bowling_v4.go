package bowling

import (
	"fmt"
)

type Game struct {
	frames [10]Frame
	rolls  []int
	frameIndex int
}

func NewGame() *Game {
	return &Game{frameIndex: 0}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 {
		return fmt.Errorf("negative roll is invalid")
	}
	if pins > 10 {
		return fmt.Errorf("roll can not hit more than 10 pins")
	}
	g.rolls = append(g.rolls, pins)
	return g.updateFrames(pins)
}

func (g *Game) updateFrames(pins int) error {
	frameIndex := g.frameIndex
	if frameIndex >= 10 {
		lastFrame := &g.frames[9]
		if !lastFrame.isComplete {
			return fmt.Errorf("cannot roll after game is over")
		}
		if lastFrame.isSpare() && len(g.rolls) > 20 {
			return fmt.Errorf("cannot roll after bonus roll for spare")
		}
		if lastFrame.isStrike() && len(g.rolls) > 21 {
			return fmt.Errorf("cannot roll after bonus roll for strike")
		}
		return nil
	}

	frame := &g.frames[frameIndex]

	if frame.isComplete {
		g.frameIndex++
		if g.frameIndex < 10 {
			frame = &g.frames[g.frameIndex]
			frame.rollOne = pins
			frame.isComplete = pins == 10
		}
	} else {
		if frame.rollOne+pins > 10 {
			return fmt.Errorf("second roll hit more than number of pins on the lane")
		}
		frame.rollTwo = pins
		frame.isComplete = true
	}

	return nil
}


func (g *Game) Score() (total int, err error) {
	if g.frameIndex < 10 {
		return 0, fmt.Errorf("not enough frames")
	}

	for i := 0; i < 10; i++ {
		frame := &g.frames[i]
		score := frame.score(g, i)
		total += score
	}
	return total, nil
}

type Frame struct {
	rollOne    int
	rollTwo    int
	isComplete bool
}

func (f *Frame) String() string {
	return fmt.Sprintf("[%d, %d]", f.rollOne, f.rollTwo)
}

func (f *Frame) score(g *Game, frameIndex int) (score int) {
	if f.isOpenFrame() {
		return f.rollOne + f.rollTwo
	}
	if f.isSpare() {
		if frameIndex+1 < 10 {
			return 10 + g.frames[frameIndex+1].rollOne
		} else if frameIndex == 9 {
			if len(g.rolls) > 20 {
				return 10 + g.rolls[20]
			}
			return 10
		}
	}
	if f.isStrike() {
		if frameIndex+1 < 10 {
			nextFrame := &g.frames[frameIndex+1]
			if nextFrame.isStrike() {
				if frameIndex+2 < 10 {
					return 10 + nextFrame.rollOne + g.frames[frameIndex+2].rollOne
				} else if frameIndex == 8 {
					if len(g.rolls) > 20 {
						return 10 + nextFrame.rollOne + g.rolls[21]
					}
					return 10 + nextFrame.rollOne
				}
			} else {
				return 10 + nextFrame.rollOne + nextFrame.rollTwo
			}

		} else if frameIndex == 9 {
			if len(g.rolls) > 20 {
				return 10 + g.rolls[20] + g.rolls[21]
			}
			return 10
		}
	}
	return 0
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