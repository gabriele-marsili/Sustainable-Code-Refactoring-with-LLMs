package clock

import "fmt"

// Define the Clock type here.
type Clock struct {
	hours   int
	minutes int
}

func New(h, m int) Clock {
	totalMinutes := h*60 + m
	totalMinutes %= 24 * 60

	if totalMinutes < 0 {
		totalMinutes += 24 * 60
	}

	hours := totalMinutes / 60
	minutes := totalMinutes % 60

	return Clock{hours, minutes}
}

func (c Clock) Add(m int) Clock {
	return New(c.hours, c.minutes+m)
}

func (c Clock) Subtract(m int) Clock {
	return New(c.hours, c.minutes-m)
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hours, c.minutes)
}