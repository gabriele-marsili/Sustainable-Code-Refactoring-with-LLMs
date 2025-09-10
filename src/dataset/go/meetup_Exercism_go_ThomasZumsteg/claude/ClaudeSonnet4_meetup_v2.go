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
	start := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)

	switch nth {
	case First:
		return dayInWeek(day, start, 0).Day()
	case Second:
		return dayInWeek(day, start, 7).Day()
	case Third:
		return dayInWeek(day, start, 14).Day()
	case Fourth:
		return dayInWeek(day, start, 21).Day()
	case Teenth:
		return dayInWeek(day, start, 12).Day()
	case Last:
		lastDay := start.AddDate(0, 1, -1)
		return dayInWeekReverse(day, lastDay).Day()
	default:
		return 0
	}
}

/*dayInWeek search a week for a particular weekday.*/
func dayInWeek(day time.Weekday, start time.Time, offset int) time.Time {
	current := start.AddDate(0, 0, offset)
	daysDiff := (int(day) - int(current.Weekday()) + 7) % 7
	return current.AddDate(0, 0, daysDiff)
}

/*dayInWeekReverse search backwards for a particular weekday.*/
func dayInWeekReverse(day time.Weekday, start time.Time) time.Time {
	daysDiff := (int(start.Weekday()) - int(day) + 7) % 7
	return start.AddDate(0, 0, -daysDiff)
}