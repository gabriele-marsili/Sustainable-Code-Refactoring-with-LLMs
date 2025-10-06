package clock

import "fmt"

type Clock struct {
	hours   int8
	minutes int8
}

func New(h, m int) Clock {
	totalMinutes := h*60 + m
	totalMinutes %= 1440
	if totalMinutes < 0 {
		totalMinutes += 1440
	}
	
	return Clock{
		hours:   int8(totalMinutes / 60),
		minutes: int8(totalMinutes % 60),
	}
}

func (c Clock) Add(m int) Clock {
	totalMinutes := int(c.hours)*60 + int(c.minutes) + m
	totalMinutes %= 1440
	if totalMinutes < 0 {
		totalMinutes += 1440
	}
	
	return Clock{
		hours:   int8(totalMinutes / 60),
		minutes: int8(totalMinutes % 60),
	}
}

func (c Clock) Subtract(m int) Clock {
	totalMinutes := int(c.hours)*60 + int(c.minutes) - m
	totalMinutes %= 1440
	if totalMinutes < 0 {
		totalMinutes += 1440
	}
	
	return Clock{
		hours:   int8(totalMinutes / 60),
		minutes: int8(totalMinutes % 60),
	}
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hours, c.minutes)
}