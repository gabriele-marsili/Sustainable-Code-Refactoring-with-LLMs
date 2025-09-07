package clock

import "fmt"

// Clock represents a time in hours and minutes.
type Clock struct {
	hour, minute int
}

// String returns the time in HH:MM format.
func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hour, c.minute)
}

// New creates a new Clock.
func New(hours int, minutes int) Clock {
	totalMinutes := hours*60 + minutes
	totalMinutes %= 24 * 60

	if totalMinutes < 0 {
		totalMinutes += 24 * 60
	}

	return Clock{totalMinutes / 60, totalMinutes % 60}
}

// Add adds minutes to the clock.
func (c Clock) Add(minutes int) Clock {
	return New(c.hour, c.minute+minutes)
}

// Subtract subtracts minutes from the clock.
func (c Clock) Subtract(minutes int) Clock {
	return New(c.hour, c.minute-minutes)
}