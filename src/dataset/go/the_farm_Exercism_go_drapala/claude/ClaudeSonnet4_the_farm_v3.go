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

func DivideFood(weightFodder WeightFodder, cows int) (float64, error) {
	if cows < 0 {
		return 0.0, &SillyNephewError{cows: cows}
	}

	if cows == 0 {
		return 0.0, errors.New("Division by zero")
	}

	fodder, err := weightFodder.FodderAmount()

	if fodder < 0 {
		return 0.0, errors.New("Negative fodder")
	}

	if err == ErrScaleMalfunction {
		return (fodder * 2) / float64(cows), nil
	}

	if err != nil {
		return 0, err
	}

	return fodder / float64(cows), nil
}