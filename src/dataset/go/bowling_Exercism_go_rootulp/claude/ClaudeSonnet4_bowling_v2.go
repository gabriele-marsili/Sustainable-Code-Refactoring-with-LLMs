package bowling

import (
	"fmt"
)

type Game struct {
	frames []*Frame
	rolls  []int
}

func NewGame() *Game {
	return &Game{
		frames: make([]*Frame, 0, 11),
		rolls:  make([]int, 0, 21),
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return fmt.Errorf("invalid roll: %d", pins)
	}
	g.rolls = append(g.rolls, pins)
	return g.parseFrames()
}

func (g *Game) parseFrames() error {
	g.frames = g.frames[:0]
	for _, roll := range g.rolls {
		isCompleteFrame := roll == 10

		frameCount := len(g.frames)
		if frameCount >= 10 && g.frames[9].isComplete && !g.frames[9].isStrike() && !g.frames[9].isSpare() {
			return fmt.Errorf("cannot roll after game is over")
		} else if frameCount > 10 && g.frames[9].isComplete && g.frames[9].isSpare() {
			return fmt.Errorf("cannot roll after bonus roll for spare")
		} else if frameCount == 11 && g.frames[9].isComplete && g.frames[9].isStrike() && g.frames[10].isComplete && !g.frames[10].isStrike() {
			return fmt.Errorf("cannot roll after bonus roll for strike")
		} else if frameCount == 0 {
			g.frames = append(g.frames, &Frame{roll, 0, isCompleteFrame})
		} else if !g.frames[frameCount-1].isComplete {
			lastFrame := g.frames[frameCount-1]
			if lastFrame.rollOne+roll > 10 {
				return fmt.Errorf("second roll hit more than number of pins on the lane")
			}
			lastFrame.rollTwo = roll
			lastFrame.isComplete = true
		} else {
			g.frames = append(g.frames, &Frame{roll, 0, isCompleteFrame})
		}
	}
	return nil
}

func (g *Game) Score() (total int, err error) {
	if err := g.parseFrames(); err != nil {
		return 0, err
	}

	if len(g.frames) < 10 {
		return 0, fmt.Errorf("not enough frames %v", g.frames)
	}

	for i := 0; i < 10; i++ {
		frame := g.frames[i]
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

func (f *Frame) score(nextFrames []*Frame) (score int, err error) {
	if f.isOpenFrame() {
		return f.rollOne + f.rollTwo, nil
	}
	
	if f.isSpare() {
		if len(nextFrames) == 0 {
			return 0, fmt.Errorf("not enough rolls after spare")
		}
		return 10 + nextFrames[0].rollOne, nil
	}
	
	if f.isStrike() {
		if len(nextFrames) == 0 {
			return 0, fmt.Errorf("not enough rolls after strike")
		}
		nextFrame := nextFrames[0]
		if nextFrame.isStrike() {
			if len(nextFrames) < 2 {
				return 0, fmt.Errorf("not enough rolls after strike")
			}
			return 10 + 10 + nextFrames[1].rollOne, nil
		}
		return 10 + nextFrame.rollOne + nextFrame.rollTwo, nil
	}
	
	return 0, fmt.Errorf("frame %v is not an open frame, spare, or strike", f)
}

func (f *Frame) isStrike() bool {
	return f.rollOne == 10
}

func (f *Frame) isSpare() bool {
	return f.rollOne != 10 && f.rollOne+f.rollTwo == 10
}

func (f *Frame) isOpenFrame() bool {
	return f.rollOne+f.rollTwo < 10
}