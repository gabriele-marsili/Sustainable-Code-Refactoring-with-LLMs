package meetup

import (
	"time"
)

type WeekSchedule string

const First WeekSchedule = "first"
const Second WeekSchedule = "second"
const Third WeekSchedule = "third"
const Fourth WeekSchedule = "fourth"
const Teenth WeekSchedule = "teenth"
const Last WeekSchedule = "last"

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	var startDay int
	var endDay int

	switch week {
	case First:
		startDay = 1
		endDay = 7
	case Second:
		startDay = 8
		endDay = 14
	case Third:
		startDay = 15
		endDay = 21
	case Fourth:
		startDay = 22
		endDay = 28
	case Teenth:
		startDay = 13
		endDay = 19
	case Last:
		lastDayOfMonth := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
		startDay = lastDayOfMonth - 6
		endDay = lastDayOfMonth
	default:
		panic("invalid WeekSchedule")
	}

	for day := startDay; day <= endDay; day++ {
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Weekday() == weekday {
			return candidate.Day()
		}
	}

	if week == Last {
		return time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day() - (time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Weekday() - weekday + 7) % 7
	}

	panic("no solution found")
}