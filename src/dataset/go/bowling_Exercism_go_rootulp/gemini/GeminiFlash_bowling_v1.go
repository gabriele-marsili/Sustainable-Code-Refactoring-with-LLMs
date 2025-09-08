package bowling

import (
	"fmt"
)

type Game struct {
	frames     []Frame
	currentFrame int
	rolls      []int
}

func NewGame() *Game {
	return &Game{
		frames:     make([]Frame, 10),
		currentFrame: 0,
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 {
		return fmt.Errorf("negative roll is invalid")
	}
	if pins > 10 {
		return fmt.Errorf("roll can not hit more than 10 pins")
	}

	if g.currentFrame >= 10 {
		if g.currentFrame == 10 && (g.frames[9].isSpare() || g.frames[9].isStrike()) {
			// Bonus roll for spare or strike
		} else if g.currentFrame == 11 && g.frames[9].isStrike() {
			// Second bonus roll for strike
		} else {
			return fmt.Errorf("cannot roll after game is over")
		}
	}

	g.rolls = append(g.rolls, pins)

	frame := &g.frames[g.currentFrame]

	if frame.rollOne == 0 {
		frame.rollOne = pins
		if pins == 10 {
			frame.isComplete = true
			g.currentFrame++
		}
	} else {
		if frame.rollOne+pins > 10 {
			return fmt.Errorf("second roll hit more than number of pins on the lane")
		}
		frame.rollTwo = pins
		frame.isComplete = true
		g.currentFrame++
	}

	return nil
}

func (g *Game) Score() (total int, err error) {
	if g.currentFrame < 10 {
		return 0, fmt.Errorf("not enough frames %v", g.frames[:g.currentFrame])
	}

	for i := 0; i < 10; i++ {
		frame := &g.frames[i]
		score := frame.rollOne + frame.rollTwo

		if frame.isSpare() {
			if i+1 < 10 {
				score += g.frames[i+1].rollOne
			} else if i+1 == 10 {
				score += g.rolls[len(g.rolls)-1] // Last roll
			} else {
				return 0, fmt.Errorf("not enough rolls after spare")
			}
		} else if frame.isStrike() {
			if i+1 < 9 {
				score += g.frames[i+1].rollOne + g.frames[i+1].rollTwo
			} else if i+1 == 9 {
				if g.frames[i+1].isStrike() {
					if len(g.rolls) > 11 {
						score += g.frames[i+1].rollOne + g.rolls[len(g.rolls)-1]
					} else {
						return 0, fmt.Errorf("not enough rolls after strike")
					}

				} else {
					score += g.frames[i+1].rollOne + g.frames[i+1].rollTwo
				}

			} else if i+1 == 10 {
				if len(g.rolls) < 12 {
					return 0, fmt.Errorf("not enough rolls after strike")
				}
				score += g.rolls[len(g.rolls)-2] + g.rolls[len(g.rolls)-1]
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

func (f *Frame) isOpenFrame() bool {
	return !f.isStrike() && !f.isSpare()
}