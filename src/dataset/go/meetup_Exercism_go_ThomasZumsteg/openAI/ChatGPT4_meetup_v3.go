package meetup

import (
	"time"
)

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
		return findDay(day, start, 0)
	case Second:
		return findDay(day, start, 7)
	case Third:
		return findDay(day, start, 14)
	case Fourth:
		return findDay(day, start, 21)
	case Teenth:
		return findDay(day, start, 12)
	case Last:
		lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC)
		return findDay(day, lastDay, -6)
	default:
		return 0
	}
}

func findDay(day time.Weekday, start time.Time, offset int) int {
	start = start.AddDate(0, 0, offset)
	diff := (int(day) - int(start.Weekday()) + 7) % 7
	return start.AddDate(0, 0, diff).Day()
}