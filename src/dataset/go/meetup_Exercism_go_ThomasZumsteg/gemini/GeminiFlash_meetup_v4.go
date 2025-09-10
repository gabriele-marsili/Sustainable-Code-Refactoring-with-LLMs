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
	var startDate int
	switch nth {
	case First:
		startDate = 1
	case Second:
		startDate = 8
	case Third:
		startDate = 15
	case Fourth:
		startDate = 22
	case Teenth:
		startDate = 13
	case Last:
		t := time.Date(year, month+1, 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -7)
		startDate = t.Day()
	default:
		return 0
	}

	t := time.Date(year, month, startDate, 0, 0, 0, 0, time.UTC)

	for i := 0; i < 7; i++ {
		currentDate := t.AddDate(0, 0, i)
		if currentDate.Weekday() == day {
			return currentDate.Day()
		}
	}

	return 0
}