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
		return findDay(day, startDate, 0)
	case Second:
		startDate = time.Date(year, month, 8, 0, 0, 0, 0, time.UTC)
		return findDay(day, startDate, 0)
	case Third:
		startDate = time.Date(year, month, 15, 0, 0, 0, 0, time.UTC)
		return findDay(day, startDate, 0)
	case Fourth:
		startDate = time.Date(year, month, 22, 0, 0, 0, 0, time.UTC)
		return findDay(day, startDate, 0)
	case Teenth:
		startDate = time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		return findDay(day, startDate, 0)
	case Last:
		lastDay := time.Date(year, month+1, 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -1).Day()
		startDate = time.Date(year, month, lastDay-6, 0, 0, 0, 0, time.UTC)
		return findDay(day, startDate, -1)
	default:
		return 0
	}
}

func findDay(day time.Weekday, start time.Time, direction int) int {
	if direction == 0 {
		for i := 0; i < 7; i++ {
			currentDay := start.AddDate(0, 0, i)
			if currentDay.Weekday() == day {
				return currentDay.Day()
			}
		}
	} else {
		for i := 0; i < 7; i++ {
			currentDay := start.AddDate(0, 0, i*direction)
			if currentDay.Weekday() == day {
				return currentDay.Day()
			}
		}
	}

	return 0
}