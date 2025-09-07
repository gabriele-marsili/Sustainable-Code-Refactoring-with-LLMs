package clock

import "fmt"

type Clock struct {
	hour, minute int
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hour, c.minute)
}

func New(hours int, minutes int) Clock {
	totalMinutes := ((hours*60 + minutes) % 1440 + 1440) % 1440
	return Clock{totalMinutes / 60, totalMinutes % 60}
}

func (c Clock) Add(minutes int) Clock {
	return New(0, c.hour*60+c.minute+minutes)
}

func (c Clock) Subtract(minutes int) Clock {
	return New(0, c.hour*60+c.minute-minutes)
}