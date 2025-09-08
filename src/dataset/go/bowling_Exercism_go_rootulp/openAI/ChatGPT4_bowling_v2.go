package bowling

import (
	"errors"
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
	frameIndex := 0

	for i := 0; i < len(g.rolls); {
		if frameIndex >= 10 && !g.isBonusRollAllowed(frameIndex) {
			return errors.New("cannot roll after game is over")
		}

		rollOne := g.rolls[i]
		if rollOne == 10 { // Strike
			g.frames = append(g.frames, &Frame{rollOne, 0, true})
			frameIndex++
			i++
			continue
		}

		if i+1 >= len(g.rolls) {
			g.frames = append(g.frames, &Frame{rollOne, 0, false})
			break
		}

		rollTwo := g.rolls[i+1]
		if rollOne+rollTwo > 10 {
			return errors.New("invalid frame: total pins exceed 10")
		}

		g.frames = append(g.frames, &Frame{rollOne, rollTwo, true})
		frameIndex++
		i += 2
	}
	return nil
}

func (g *Game) isBonusRollAllowed(frameIndex int) bool {
	if frameIndex == 10 {
		lastFrame := g.frames[9]
		return lastFrame.isStrike() || lastFrame.isSpare()
	}
	if frameIndex == 11 {
		return g.frames[9].isStrike()
	}
	return false
}

func (g *Game) Score() (int, error) {
	if err := g.parseFrames(); err != nil {
		return 0, err
	}

	if len(g.frames) < 10 {
		return 0, fmt.Errorf("not enough frames: %d", len(g.frames))
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

	nextRolls := collectNextRolls(nextFrames, 2)
	if f.isSpare() {
		if len(nextRolls) < 1 {
			return 0, errors.New("not enough rolls after spare")
		}
		return 10 + nextRolls[0], nil
	}

	if f.isStrike() {
		if len(nextRolls) < 2 {
			return 0, errors.New("not enough rolls after strike")
		}
		return 10 + nextRolls[0] + nextRolls[1], nil
	}

	return 0, errors.New("invalid frame state")
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
		if len(rolls) < count && !frame.isStrike() {
			rolls = append(rolls, frame.rollTwo)
		}
	}
	return rolls
}