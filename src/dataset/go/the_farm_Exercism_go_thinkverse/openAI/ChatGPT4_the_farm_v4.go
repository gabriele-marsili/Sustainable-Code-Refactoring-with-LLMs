package thefarm

import (
	"errors"
	"fmt"
)

type SillyNephewError struct {
	cows int
}

func (e *SillyNephewError) Error() string {
	return fmt.Sprintf("silly nephew, there cannot be %d cows", e.cows)
}

// DivideFood computes the fodder amount per cow for the given cows.
func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	if cows == 0 {
		return 0.0, errors.New("division by zero")
	}
	if cows < 0 {
		return 0.0, &SillyNephewError{cows}
	}

	amount, err := weightFodder.FodderAmount()
	switch {
	case err == ErrScaleMalfunction && amount > 0:
		return (amount * 2) / float64(cows), nil
	case err != nil && err != ErrScaleMalfunction:
		return 0.0, err
	case amount < 0:
		return 0.0, errors.New("negative fodder")
	}

	return amount / float64(cows), nil
}