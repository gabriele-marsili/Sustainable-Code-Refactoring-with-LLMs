package thefarm

import (
	"errors"
	"fmt"
)

// See types.go for the types defined for this exercise.
type SillyNephewError struct {
	cows int
}

func (e *SillyNephewError) Error() string {
	return fmt.Sprintf("silly nephew, there cannot be %d cows", e.cows)
}

// DivideFood computes the fodder amount per cow for the given cows.
func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	// Handle negative cows first (cheapest check)
	if cows < 0 {
		return 0.0, &SillyNephewError{cows: cows}
	}

	// Handle division by zero
	if cows == 0 {
		return 0.0, errors.New("Division by zero")
	}

	fodder, err := weightFodder.FodderAmount()
	
	// Handle negative fodder
	if fodder < 0 {
		return 0.0, errors.New("Negative fodder")
	}

	cowsFloat := float64(cows)

	// Error handling
	if err == ErrScaleMalfunction {
		return (fodder * 2) / cowsFloat, nil
	} else if err != nil {
		return 0, err
	}

	// Happy Path
	return fodder / cowsFloat, nil
}