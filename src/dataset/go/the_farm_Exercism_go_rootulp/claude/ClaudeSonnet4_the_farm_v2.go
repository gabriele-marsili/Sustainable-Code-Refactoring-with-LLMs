package thefarm

import (
	"errors"
	"fmt"
)

// Pre-allocated error messages to avoid runtime allocations
var (
	errNegativeFodder = errors.New("Negative fodder")
	errDivisionByZero = errors.New("Division by zero")
)

// DivideFood computes the fodder amount per cow for the given cows.
func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	// Early validation to avoid unnecessary function call
	if cows == 0 {
		return 0, errDivisionByZero
	}
	if cows < 0 {
		return 0, fmt.Errorf("silly nephew, there cannot be %d cows", cows)
	}
	
	fodderAmount, err := weightFodder.FodderAmount()
	if fodderAmount < 0 {
		return 0, errNegativeFodder
	}
	if err == ErrScaleMalfunction {
		return fodderAmount * 2 / float64(cows), nil
	}
	if err != nil {
		return 0, err
	}
	
	return fodderAmount / float64(cows), nil
}