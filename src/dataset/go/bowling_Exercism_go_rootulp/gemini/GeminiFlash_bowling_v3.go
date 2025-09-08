package bowling

import (
	"fmt"
)

type Game struct {
	frames [10]Frame
	rolls  []int
	frameIndex int
	rollInFrame int
	gameOver bool
}

func NewGame() *Game {
	return &Game{
		frameIndex: 0,
		rollInFrame: 0,
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 {
		return fmt.Errorf("negative roll is invalid")
	}
	if pins > 10 {
		return fmt.Errorf("roll can not hit more than 10 pins")
	}

	if g.gameOver {
		return fmt.Errorf("cannot roll after game is over")
	}

	if g.frameIndex >= 10 {
		g.gameOver = true
		return fmt.Errorf("cannot roll after game is over")
	}

	frame := &g.frames[g.frameIndex]

	if g.rollInFrame == 0 {
		frame.rollOne = pins
		if pins == 10 {
			frame.isComplete = true
			g.frameIndex++
		} else {
			g.rollInFrame++
		}
	} else {
		if frame.rollOne+pins > 10 {
			return fmt.Errorf("second roll hit more than number of pins on the lane")
		}
		frame.rollTwo = pins
		frame.isComplete = true
		g.frameIndex++
		g.rollInFrame = 0
	}

	g.rolls = append(g.rolls, pins)

	if g.frameIndex == 10 {
		if frame.isSpare() || frame.isStrike() {
			return nil
		}
		g.gameOver = true
	}

	return nil
}

func (g *Game) Score() (total int, err error) {
	if g.frameIndex < 10 {
		return 0, fmt.Errorf("not enough frames")
	}

	for i := 0; i < 10; i++ {
		frame := &g.frames[i]
		score, err := frame.score(g.frames[i+1:])
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

func (f *Frame) String() string {
	return fmt.Sprintf("[%d, %d]", f.rollOne, f.rollTwo)
}

func (f *Frame) score(nextFrames []Frame) (score int, err error) {
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
	return 0, fmt.Errorf("frame %v is not an open frame, spare, or strike", f)
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

func nextRolls(nextFrames []Frame) (rolls []int) {
	rolls = make([]int, 0, 4)
	for _, frame := range nextFrames {
		if frame.isStrike() {
			rolls = append(rolls, frame.rollOne)
		} else {
			rolls = append(rolls, frame.rollOne)
			rolls = append(rolls, frame.rollTwo)
		}
	}
	return rolls
}