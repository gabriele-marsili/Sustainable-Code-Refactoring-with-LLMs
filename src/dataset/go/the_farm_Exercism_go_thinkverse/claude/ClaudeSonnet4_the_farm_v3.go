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

var (
	errNegativeFodder = errors.New("negative fodder")
	errDivisionByZero = errors.New("division by zero")
)

// DivideFood computes the fodder amount per cow for the given cows.
func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	if cows == 0 {
		return 0.0, errDivisionByZero
	}

	if cows < 0 {
		return 0.0, &SillyNephewError{cows}
	}

	amount, err := weightFodder.FodderAmount()

	if amount < 0 {
		return 0.0, errNegativeFodder
	}

	if err == ErrScaleMalfunction && amount > 0 {
		return (amount * 2) / float64(cows), nil
	}

	if err != nil {
		return 0.0, err
	}

	return amount / float64(cows), nil
}