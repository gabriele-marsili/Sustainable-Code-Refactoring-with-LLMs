package clock

import "fmt"

// Define the Clock type here.
type Clock struct {
	hours   int
	minutes int
}

func New(h, m int) Clock {
	totalMinutes := h*60 + m
	totalMinutes = ((totalMinutes % 1440) + 1440) % 1440
	
	return Clock{
		hours:   totalMinutes / 60,
		minutes: totalMinutes % 60,
	}
}

func (c Clock) Add(m int) Clock {
	totalMinutes := c.hours*60 + c.minutes + m
	totalMinutes = ((totalMinutes % 1440) + 1440) % 1440
	
	return Clock{
		hours:   totalMinutes / 60,
		minutes: totalMinutes % 60,
	}
}

func (c Clock) Subtract(m int) Clock {
	totalMinutes := c.hours*60 + c.minutes - m
	totalMinutes = ((totalMinutes % 1440) + 1440) % 1440
	
	return Clock{
		hours:   totalMinutes / 60,
		minutes: totalMinutes % 60,
	}
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hours, c.minutes)
}