package clock

import "fmt"

// Define the Clock type here.
type Clock struct {
	hours   int
	minutes int
}

func New(h, m int) Clock {
	totalMinutes := (h*60 + m) % 1440
	if totalMinutes < 0 {
		totalMinutes += 1440
	}

	return Clock{
		hours:   totalMinutes / 60,
		minutes: totalMinutes % 60,
	}
}

func (c Clock) Add(m int) Clock {
	return New(0, c.hours*60+c.minutes+m)
}

func (c Clock) Subtract(m int) Clock {
	return New(0, c.hours*60+c.minutes-m)
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hours, c.minutes)
}