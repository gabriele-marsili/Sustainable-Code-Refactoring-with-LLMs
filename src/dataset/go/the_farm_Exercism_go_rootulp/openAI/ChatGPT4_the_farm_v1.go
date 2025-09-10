package thefarm

import (
	"errors"
	"fmt"
)

// DivideFood computes the fodder amount per cow for the given cows.
func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	if cows == 0 {
		return 0, errors.New("Division by zero")
	}
	if cows < 0 {
		return 0, fmt.Errorf("silly nephew, there cannot be %d cows", cows)
	}

	fodderAmount, err := weightFodder.FodderAmount()
	switch {
	case err == ErrScaleMalfunction:
		return (fodderAmount * 2) / float64(cows), nil
	case err != nil:
		return 0, err
	case fodderAmount < 0:
		return 0, errors.New("Negative fodder")
	default:
		return fodderAmount / float64(cows), nil
	}
}