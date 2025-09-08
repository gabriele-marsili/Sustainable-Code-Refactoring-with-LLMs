package bowling

import (
	"fmt"
)

type Game struct {
	rolls    []int
	rollIdx  int
	complete bool
}

func NewGame() *Game {
	return &Game{
		rolls: make([]int, 0, 21), // Pre-allocate for maximum possible rolls
	}
}

func (g *Game) Roll(pins int) error {
	if pins < 0 {
		return fmt.Errorf("negative roll is invalid")
	}
	if pins > 10 {
		return fmt.Errorf("roll can not hit more than 10 pins")
	}
	if g.complete {
		return fmt.Errorf("cannot roll after game is over")
	}
	
	g.rolls = append(g.rolls, pins)
	return g.validateRoll()
}

func (g *Game) validateRoll() error {
	rollCount := len(g.rolls)
	if rollCount == 0 {
		return nil
	}
	
	frameNum := 0
	rollIdx := 0
	
	for frameNum < 10 && rollIdx < rollCount {
		if frameNum == 9 { // 10th frame
			return g.validate10thFrame(rollIdx, rollCount)
		}
		
		if g.rolls[rollIdx] == 10 { // Strike
			rollIdx++
			frameNum++
		} else {
			if rollIdx+1 >= rollCount {
				return nil // Incomplete frame
			}
			if g.rolls[rollIdx]+g.rolls[rollIdx+1] > 10 {
				return fmt.Errorf("second roll hit more than number of pins on the lane")
			}
			rollIdx += 2
			frameNum++
		}
	}
	
	if frameNum == 10 {
		g.complete = true
	}
	
	return nil
}

func (g *Game) validate10thFrame(startIdx, rollCount int) error {
	remaining := rollCount - startIdx
	
	if remaining == 1 {
		return nil // First roll of 10th frame
	}
	
	firstRoll := g.rolls[startIdx]
	
	if firstRoll == 10 { // Strike in 10th frame
		if remaining == 2 {
			return nil // Need one more roll
		}
		if remaining >= 3 {
			secondRoll := g.rolls[startIdx+1]
			thirdRoll := g.rolls[startIdx+2]
			if secondRoll != 10 && secondRoll+thirdRoll > 10 {
				return fmt.Errorf("second roll hit more than number of pins on the lane")
			}
			if remaining > 3 {
				return fmt.Errorf("cannot roll after bonus roll for strike")
			}
		}
	} else {
		secondRoll := g.rolls[startIdx+1]
		if firstRoll+secondRoll > 10 {
			return fmt.Errorf("second roll hit more than number of pins on the lane")
		}
		
		if firstRoll+secondRoll == 10 { // Spare in 10th frame
			if remaining == 2 {
				return nil // Need bonus roll
			}
			if remaining > 3 {
				return fmt.Errorf("cannot roll after bonus roll for spare")
			}
		} else { // Open frame in 10th frame
			if remaining > 2 {
				return fmt.Errorf("cannot roll after game is over")
			}
		}
	}
	
	return nil
}

func (g *Game) Score() (total int, err error) {
	if len(g.rolls) == 0 {
		return 0, fmt.Errorf("not enough frames []")
	}
	
	rollIdx := 0
	
	for frame := 0; frame < 10; frame++ {
		if rollIdx >= len(g.rolls) {
			return 0, fmt.Errorf("not enough frames")
		}
		
		if g.rolls[rollIdx] == 10 { // Strike
			if rollIdx+2 >= len(g.rolls) {
				return 0, fmt.Errorf("not enough rolls after strike")
			}
			total += 10 + g.rolls[rollIdx+1] + g.rolls[rollIdx+2]
			rollIdx++
		} else if rollIdx+1 < len(g.rolls) && g.rolls[rollIdx]+g.rolls[rollIdx+1] == 10 { // Spare
			if rollIdx+2 >= len(g.rolls) {
				return 0, fmt.Errorf("not enough rolls after spare")
			}
			total += 10 + g.rolls[rollIdx+2]
			rollIdx += 2
		} else { // Open frame
			if rollIdx+1 >= len(g.rolls) {
				return 0, fmt.Errorf("not enough frames")
			}
			total += g.rolls[rollIdx] + g.rolls[rollIdx+1]
			rollIdx += 2
		}
	}
	
	return total, nil
}

func (g *Game) lastFrame() *Frame {
	return &Frame{}
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
	return isStrike(f.rollOne)
}

func (f *Frame) isSpare() bool {
	return !f.isStrike() && f.rollOne+f.rollTwo == 10
}

func (f *Frame) isOpenFrame() bool {
	return !f.isStrike() && !f.isSpare()
}

func isStrike(roll int) bool {
	return roll == 10
}

func nextRolls(nextFrames []*Frame) (rolls []int) {
	rolls = []int{}
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