package clock

import "fmt"

// Create Clock Struct
type Clock struct {
	hour, minute int
}

// Convert to string
func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hour, c.minute)
}

// New Clock
func New(hours int, minutes int) Clock {
	// Turn everything into minutes
	totalMinutes := hours*60 + minutes

	// Normalize to positive minutes within a day
	totalMinutes = ((totalMinutes % 1440) + 1440) % 1440

	// Get hours and mins
	hours = totalMinutes / 60
	minutes = totalMinutes % 60

	return Clock{hours, minutes}
}

// Add Minutes
func (c Clock) Add(minutes int) Clock {
	totalMinutes := c.hour*60 + c.minute + minutes
	totalMinutes = ((totalMinutes % 1440) + 1440) % 1440
	
	return Clock{totalMinutes / 60, totalMinutes % 60}
}

// Subtract Minutes
func (c Clock) Subtract(minutes int) Clock {
	totalMinutes := c.hour*60 + c.minute - minutes
	totalMinutes = ((totalMinutes % 1440) + 1440) % 1440
	
	return Clock{totalMinutes / 60, totalMinutes % 60}
}