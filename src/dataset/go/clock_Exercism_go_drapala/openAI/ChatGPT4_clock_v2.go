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

// Normalize time to valid range
func normalizeTime(hours, minutes int) (int, int) {
	totalMinutes := (hours*60 + minutes) % 1440
	if totalMinutes < 0 {
		totalMinutes += 1440
	}
	return totalMinutes / 60, totalMinutes % 60
}

// New Clock
func New(hours int, minutes int) Clock {
	hours, minutes = normalizeTime(hours, minutes)
	return Clock{hours, minutes}
}

// Add Minutes
func (c Clock) Add(minutes int) Clock {
	return New(c.hour, c.minute+minutes)
}

// Subtract Minutes
func (c Clock) Subtract(minutes int) Clock {
	return New(c.hour, c.minute-minutes)
}