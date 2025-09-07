package clock

import "fmt"

const TestVersion = 2

type Clock int

const minutesPerDay = 1440

func Time(hour, minute int) Clock {
	time := (hour*60 + minute) % minutesPerDay
	if time < 0 {
		time += minutesPerDay
	}
	return Clock(time)
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c/60, c%60)
}

func (c Clock) Add(minutes int) Clock {
	total := int(c) + minutes
	total %= minutesPerDay
	if total < 0 {
		total += minutesPerDay
	}
	return Clock(total)
}