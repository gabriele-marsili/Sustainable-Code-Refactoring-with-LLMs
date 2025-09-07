package clock

import "fmt"

// Clock represents a time of day in hours and minutes.
type Clock struct {
	hour, minute int
}

// String returns the time in HH:MM format.
func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hour, c.minute)
}

// New creates a new Clock.
func New(hour int, minute int) Clock {
	totalMinutes := hour*60 + minute
	return normalize(totalMinutes)
}

// Add adds minutes to the clock.
func (c Clock) Add(minutes int) Clock {
	return normalize(c.hour*60 + c.minute + minutes)
}

// Subtract subtracts minutes from the clock.
func (c Clock) Subtract(minutes int) Clock {
	return normalize(c.hour*60 + c.minute - minutes)
}

// normalize converts total minutes to a Clock.
func normalize(totalMinutes int) Clock {
	totalMinutes %= (24 * 60)

	if totalMinutes < 0 {
		totalMinutes += (24 * 60)
	}

	hour := totalMinutes / 60
	minute := totalMinutes % 60

	return Clock{hour, minute}
}