package clock

import "fmt"

// TestVersion is the unit tests this is guarenteed to pass.
const TestVersion = 2

// Clock keeps time, limited to a day
type Clock int

/*Time creates a Clock set to a given time.*/
func Time(hour, minute int) Clock {
	totalMinutes := hour*60 + minute
	totalMinutes %= (60 * 24)
	if totalMinutes < 0 {
		totalMinutes += 60 * 24
	}
	return Clock(totalMinutes)
}

/*String returns a clock in digital form hh:mm.*/
func (c Clock) String() string {
	hour := c / 60
	minute := c % 60
	return fmt.Sprintf("%02d:%02d", hour, minute)
}

/*Add move the time by a number of minutes.*/
func (c Clock) Add(minutes int) Clock {
	newMinutes := int(c) + minutes
	return Time(0, newMinutes)
}