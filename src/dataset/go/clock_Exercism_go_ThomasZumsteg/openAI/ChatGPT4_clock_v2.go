package clock

import "fmt"

// TestVersion is the unit tests this is guaranteed to pass.
const TestVersion = 2

// Clock keeps time, limited to a day
type Clock int

// Time creates a Clock set to a given time.
func Time(hour, minute int) Clock {
	time := (hour*60 + minute) % 1440
	if time < 0 {
		time += 1440
	}
	return Clock(time)
}

// String returns a clock in digital form hh:mm.
func (c Clock) String() string {
	hour := c / 60
	minute := c % 60
	return fmt.Sprintf("%02d:%02d", hour, minute)
}

// Add moves the time by a number of minutes.
func (c Clock) Add(minutes int) Clock {
	return Clock((int(c) + minutes) % 1440).normalize()
}

// normalize ensures the clock value is within the valid range.
func (c Clock) normalize() Clock {
	if c < 0 {
		c += 1440
	}
	return c
}