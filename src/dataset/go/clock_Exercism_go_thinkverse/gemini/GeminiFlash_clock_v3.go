package clock

import "fmt"

// Define the Clock type here.
type Clock struct {
	minutes int
}

func New(h, m int) Clock {
	totalMinutes := (h*60 + m) % (24 * 60)
	if totalMinutes < 0 {
		totalMinutes += (24 * 60)
	}
	return Clock{minutes: totalMinutes}
}

func (c Clock) Add(m int) Clock {
	return New(0, c.minutes+m)
}

func (c Clock) Subtract(m int) Clock {
	return New(0, c.minutes-m)
}

func (c Clock) String() string {
	hours := c.minutes / 60
	hours %= 24
	minutes := c.minutes % 60
	return fmt.Sprintf("%02d:%02d", hours, minutes)
}