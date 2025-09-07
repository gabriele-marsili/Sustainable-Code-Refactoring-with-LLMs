package clock

import "fmt"

// TestVersion is the unit tests this is guarenteed to pass.
const TestVersion = 2

// Clock keeps time, limited to a day
type Clock int

const minutesInDay = 60 * 24

/*Time creates a Clock set to a given time.*/
func Time(hour, minute int) Clock {
	totalMinutes := hour*60 + minute
	return Clock(((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay)
}

/*String returns a clock in digital form hh:mm.*/
func (c Clock) String() string {
	hour := c / 60
	minute := c % 60
	return fmt.Sprintf("%02d:%02d", hour, minute)
}

/*Add move the time by a number of minutes.*/
func (c Clock) Add(minutes int) Clock {
	return Clock((int(c) + minutes + minutesInDay*1000) % minutesInDay)
}