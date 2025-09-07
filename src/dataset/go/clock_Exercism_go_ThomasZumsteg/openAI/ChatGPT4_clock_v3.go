package clock

import "fmt"

const TestVersion = 2

type Clock int

func Time(hour, minute int) Clock {
	time := (hour*60 + minute) % 1440
	if time < 0 {
		time += 1440
	}
	return Clock(time)
}

func (c Clock) String() string {
	hour := c / 60
	minute := c % 60
	return fmt.Sprintf("%02d:%02d", hour, minute)
}

func (c Clock) Add(minutes int) Clock {
	return Clock((int(c) + minutes) % 1440).normalize()
}

func (c Clock) normalize() Clock {
	if c < 0 {
		c += 1440
	}
	return c
}