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
	// Convert to total minutes and normalize in one step
	totalMinutes := hours*60 + minutes
	
	// Handle negative values efficiently
	if totalMinutes < 0 {
		// Calculate how many full days to add
		days := (-totalMinutes + 1439) / 1440 // 1440 = 24*60
		totalMinutes += days * 1440
	}
	
	// Normalize to 24-hour format
	totalMinutes %= 1440
	
	return Clock{totalMinutes / 60, totalMinutes % 60}
}

// Add Minutes
func (c Clock) Add(minutes int) Clock {
	totalMinutes := c.hour*60 + c.minute + minutes
	
	if totalMinutes < 0 {
		days := (-totalMinutes + 1439) / 1440
		totalMinutes += days * 1440
	}
	
	totalMinutes %= 1440
	
	return Clock{totalMinutes / 60, totalMinutes % 60}
}

// Subtract Minutes
func (c Clock) Subtract(minutes int) Clock {
	totalMinutes := c.hour*60 + c.minute - minutes
	
	if totalMinutes < 0 {
		days := (-totalMinutes + 1439) / 1440
		totalMinutes += days * 1440
	}
	
	totalMinutes %= 1440
	
	return Clock{totalMinutes / 60, totalMinutes % 60}
}