package clock

import "fmt"

// Define the Clock type here.
type Clock struct {
	hours   int
	minutes int
}

func New(h, m int) Clock {
	// Handle negative minutes first
	if m < 0 {
		// Calculate how many hours to subtract
		hoursToSubtract := (-m + 59) / 60
		h -= hoursToSubtract
		m += hoursToSubtract * 60
	}
	
	// Handle overflow minutes
	if m >= 60 {
		h += m / 60
		m %= 60
	}
	
	// Normalize hours
	h %= 24
	if h < 0 {
		h += 24
	}
	
	return Clock{h, m}
}

func (c Clock) Add(m int) Clock {
	totalMinutes := c.minutes + m
	newHours := c.hours
	
	if totalMinutes >= 60 {
		newHours += totalMinutes / 60
		totalMinutes %= 60
	} else if totalMinutes < 0 {
		hoursToSubtract := (-totalMinutes + 59) / 60
		newHours -= hoursToSubtract
		totalMinutes += hoursToSubtract * 60
	}
	
	newHours %= 24
	if newHours < 0 {
		newHours += 24
	}
	
	return Clock{newHours, totalMinutes}
}

func (c Clock) Subtract(m int) Clock {
	totalMinutes := c.minutes - m
	newHours := c.hours
	
	if totalMinutes < 0 {
		hoursToSubtract := (-totalMinutes + 59) / 60
		newHours -= hoursToSubtract
		totalMinutes += hoursToSubtract * 60
	}
	
	newHours %= 24
	if newHours < 0 {
		newHours += 24
	}
	
	return Clock{newHours, totalMinutes}
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hours, c.minutes)
}