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

	fodderAmount, err := weightFodder.FodderAmount()

	if err != nil {
		if err == ErrScaleMalfunction {
			if cows < 0 {
				return 0, fmt.Errorf("silly nephew, there cannot be %d cows", cows)
			}
			return fodderAmount * 2 / float64(cows), nil
		}
		return 0, err
	}

	if fodderAmount < 0 {
		return 0, errors.New("Negative fodder")
	}

	if cows < 0 {
		return 0, fmt.Errorf("silly nephew, there cannot be %d cows", cows)
	}

	return fodderAmount / float64(cows), nil
}