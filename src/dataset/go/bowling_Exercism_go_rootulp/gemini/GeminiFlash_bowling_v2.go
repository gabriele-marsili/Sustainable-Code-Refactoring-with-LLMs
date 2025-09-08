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

	if g.frameIndex >= 10 {
		lastFrame := &g.frames[9]
		if lastFrame.isComplete && !lastFrame.isStrike() && !lastFrame.isSpare() {
			return fmt.Errorf("cannot roll after game is over")
		} else if lastFrame.isComplete && lastFrame.isSpare() && len(g.rolls) > 21 {
			return fmt.Errorf("cannot roll after bonus roll for spare")
		} else if lastFrame.isComplete && lastFrame.isStrike() && len(g.rolls) > 22 {
			return fmt.Errorf("cannot roll after bonus rolls for strike")
		}
	}

	if g.frameIndex < 10 {
		currentFrame := &g.frames[g.frameIndex]
		if currentFrame.rollOne == 0 {
			currentFrame.rollOne = pins
			if pins == 10 {
				currentFrame.isComplete = true
				g.frameIndex++
			}
		} else {
			if currentFrame.rollOne+pins > 10 {
				return fmt.Errorf("second roll hit more than number of pins on the lane")
			}
			currentFrame.rollTwo = pins
			currentFrame.isComplete = true
			g.frameIndex++
		}
	}

	return nil
}

func (g *Game) Score() (int, error) {
	if g.frameIndex < 10 {
		return 0, fmt.Errorf("not enough frames")
	}

	total := 0
	for i := 0; i < 10; i++ {
		frame := &g.frames[i]
		score := frame.rollOne + frame.rollTwo

		if frame.isSpare() {
			if i < 9 {
				score += g.frames[i+1].rollOne
			} else if len(g.rolls) > 20 {
				score += g.rolls[20]
			} else {
				return 0, fmt.Errorf("not enough rolls after spare")
			}
		} else if frame.isStrike() {
			if i < 9 {
				nextFrame := &g.frames[i+1]
				score += nextFrame.rollOne

				if nextFrame.isStrike() && i < 8 {
					score += g.frames[i+2].rollOne
				} else {
					score += nextFrame.rollTwo
				}
			} else if len(g.rolls) > 21 {
				score += g.rolls[20] + g.rolls[21]
			} else {
				return 0, fmt.Errorf("not enough rolls after strike")
			}
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

func (f *Frame) String() string {
	return fmt.Sprintf("[%d, %d]", f.rollOne, f.rollTwo)
}

func (f *Frame) isStrike() bool {
	return f.rollOne == 10
}

func (f *Frame) isSpare() bool {
	return !f.isStrike() && f.rollOne+f.rollTwo == 10
}