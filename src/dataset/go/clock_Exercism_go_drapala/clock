package clock

import "fmt"

// Clock Struct
type Clock struct {
	hour, minute int
}

// String representation of Clock
func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hour, c.minute)
}

// New Clock
func New(hours int, minutes int) Clock {
	totalMinutes := ((hours*60 + minutes) % 1440 + 1440) % 1440
	return Clock{totalMinutes / 60, totalMinutes % 60}
}

// Add Minutes
func (c Clock) Add(minutes int) Clock {
	return New(c.hour, c.minute+minutes)
}

// Subtract Minutes
func (c Clock) Subtract(minutes int) Clock {
	return New(c.hour, c.minute-minutes)
}