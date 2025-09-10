package meetup

import "time"

const TestVersion = 1

type WeekSchedule int

const (
	First  WeekSchedule = iota
	Second
	Third
	Fourth
	Last
	Teenth
)

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

func dayInWeek(day time.Weekday, start time.Time, reverse bool) time.Time {
	startWeekday := start.Weekday()
	var offset int
	
	if reverse {
		offset = (int(startWeekday) - int(day) + 7) % 7
		if offset == 0 {
			offset = 7
		}
		return start.AddDate(0, 0, -offset)
	}
	
	offset = (int(day) - int(startWeekday) + 7) % 7
	return start.AddDate(0, 0, offset)
}