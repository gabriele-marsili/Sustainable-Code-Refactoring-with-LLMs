package meetup

import (
	"time"
)

//TestVersion is the unit test verions that this will work for.
const TestVersion = 1

//WeekSchedule is the position of a week in the month
type WeekSchedule int

//The valid list of positions
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
	var startDate time.Time

	switch nth {
	case First:
		startDate = time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
		return findDayInWeek(day, startDate, false)
	case Second:
		startDate = time.Date(year, month, 8, 0, 0, 0, 0, time.UTC)
		return findDayInWeek(day, startDate, false)
	case Third:
		startDate = time.Date(year, month, 15, 0, 0, 0, 0, time.UTC)
		return findDayInWeek(day, startDate, false)
	case Fourth:
		startDate = time.Date(year, month, 22, 0, 0, 0, 0, time.UTC)
		return findDayInWeek(day, startDate, false)
	case Teenth:
		startDate = time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		return findDayInWeek(day, startDate, false)
	case Last:
		lastDay := time.Date(year, month+1, 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -1)
		startDate = lastDay.AddDate(0, 0, -6)
		return findDayInWeek(day, startDate, true)
	default:
		return 0
	}
}

/*findDayInWeek search a week for a particular weekday.*/
func findDayInWeek(day time.Weekday, start time.Time, reverse bool) int {
	step := 1
	if reverse {
		step = -1
	}

	for i := 0; i < 7; i++ {
		date := start.AddDate(0, 0, i*step)
		if date.Weekday() == day {
			return date.Day()
		}
	}
	return 0 // Should not happen, but handle it to avoid infinite loops or panics
}