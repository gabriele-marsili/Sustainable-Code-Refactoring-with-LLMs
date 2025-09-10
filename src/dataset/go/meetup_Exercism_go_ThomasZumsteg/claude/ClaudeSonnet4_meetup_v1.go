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
		return dayInWeek(day, start, false).Day()
	case Second:
		return dayInWeek(day, start.AddDate(0, 0, 7), false).Day()
	case Third:
		return dayInWeek(day, start.AddDate(0, 0, 14), false).Day()
	case Fourth:
		return dayInWeek(day, start.AddDate(0, 0, 21), false).Day()
	case Teenth:
		return dayInWeek(day, start.AddDate(0, 0, 12), false).Day()
	case Last:
		return dayInWeek(day, start.AddDate(0, 1, -1), true).Day()
	default:
		return 0
	}
}

/*dayInWeek search a week for a particular weekday.*/
func dayInWeek(day time.Weekday, start time.Time, reverse bool) time.Time {
	startWeekday := int(start.Weekday())
	targetWeekday := int(day)
	
	var offset int
	if reverse {
		offset = (startWeekday - targetWeekday + 7) % 7
		if offset == 0 {
			offset = 7
		}
		offset = -offset
	} else {
		offset = (targetWeekday - startWeekday + 7) % 7
	}
	
	return start.AddDate(0, 0, offset)
}