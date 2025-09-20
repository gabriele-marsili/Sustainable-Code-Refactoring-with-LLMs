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

/*MeetupDay finds a day in a month that is in some position in the month.*/
func MeetupDay(nth WeekSchedule, day time.Weekday, month time.Month, year int) int {
	var start time.Time

	switch nth {
	case First:
		start = time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	case Second:
		start = time.Date(year, month, 8, 0, 0, 0, 0, time.UTC)
	case Third:
		start = time.Date(year, month, 15, 0, 0, 0, 0, time.UTC)
	case Fourth:
		start = time.Date(year, month, 22, 0, 0, 0, 0, time.UTC)
	case Teenth:
		start = time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
	case Last:
		start = time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC) // Last day of the month
	default:
		return 0
	}

	return findDay(day, start).Day()
}

/*findDay searches for a particular weekday starting from a given date.*/
func findDay(day time.Weekday, start time.Time) time.Time {
	offset := (int(day) - int(start.Weekday()) + 7) % 7
	return start.AddDate(0, 0, offset)
}