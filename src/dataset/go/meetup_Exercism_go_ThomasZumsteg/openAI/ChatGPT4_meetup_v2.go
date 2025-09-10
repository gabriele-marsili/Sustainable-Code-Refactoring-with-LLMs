package meetup

import (
	"time"
)

// TestVersion is the unit test version that this will work for.
const TestVersion = 1

// WeekSchedule is the position of a week in the month
type WeekSchedule int

// The valid list of positions
const (
	First  WeekSchedule = iota // 1-7
	Second                     // 8-14
	Third                      // 15-21
	Fourth                     // 22-29
	Last                       // [31|30|29|28] - [25|24|23|22]
	Teenth                     // 13-19
)

/* MeetupDay finds a day in a month that is in some position in the month. */
func MeetupDay(nth WeekSchedule, day time.Weekday, month time.Month, year int) int {
	var startDay int
	switch nth {
	case First:
		startDay = 1
	case Second:
		startDay = 8
	case Third:
		startDay = 15
	case Fourth:
		startDay = 22
	case Teenth:
		startDay = 13
	case Last:
		lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
		return findDay(day, year, month, lastDay, -1)
	default:
		return 0
	}
	return findDay(day, year, month, startDay, 1)
}

/* findDay locates the specific weekday starting from a given day. */
func findDay(targetDay time.Weekday, year int, month time.Month, startDay, step int) int {
	for {
		date := time.Date(year, month, startDay, 0, 0, 0, 0, time.UTC)
		if date.Weekday() == targetDay {
			return date.Day()
		}
		startDay += step
	}
}