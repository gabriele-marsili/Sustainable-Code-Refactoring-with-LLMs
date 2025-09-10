package meetup

import (
	"time"
)

type WeekSchedule string

const (
	First  WeekSchedule = "first"
	Second WeekSchedule = "second"
	Third  WeekSchedule = "third"
	Fourth WeekSchedule = "fourth"
	Teenth WeekSchedule = "teenth"
	Last   WeekSchedule = "last"
)

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	var startDay, endDay int

	switch week {
	case First:
		startDay, endDay = 1, 7
	case Second:
		startDay, endDay = 8, 14
	case Third:
		startDay, endDay = 15, 21
	case Fourth:
		startDay, endDay = 22, 28
	case Teenth:
		startDay, endDay = 13, 19
	case Last:
		lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
		startDay, endDay = lastDay-6, lastDay
	}

	for day := startDay; day <= endDay; day++ {
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Weekday() == weekday {
			return candidate.Day()
		}
	}

	panic("no solution found")
}