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
	var startDay int
	switch week {
	case First:
		startDay = 1
	case Second:
		startDay = 8
	case Third:
		startDay = 15
	case Fourth:
		startDay = 22
	case Teenth:
		startDay = 13
	case Last:
		lastDayOfMonth := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
		startDay = lastDayOfMonth - 6
	default:
		panic("invalid week schedule")
	}

	for i := 0; i < 7; i++ {
		day := startDay + i
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Month() != month {
			continue
		}
		if candidate.Weekday() == weekday {
			if week == Last {
				return candidate.Day()
			}
			if isMatchingWeekSchedule(week, candidate) {
				return candidate.Day()
			}
		}
	}

	panic("no solution found")
}

func isMatchingWeekSchedule(week WeekSchedule, candidate time.Time) bool {
	switch week {
	case First:
		return candidate.Day() <= 7
	case Second:
		return candidate.Day() >= 8 && candidate.Day() <= 14
	case Third:
		return candidate.Day() >= 15 && candidate.Day() <= 21
	case Fourth:
		return candidate.Day() >= 22 && candidate.Day() <= 28
	case Teenth:
		return candidate.Day() < 20
	default:
		return false
	}
}