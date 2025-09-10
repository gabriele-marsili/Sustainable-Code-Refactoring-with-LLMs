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
	switch week {
	case First:
		return findDayInWeek(1, 7, weekday, month, year)
	case Second:
		return findDayInWeek(8, 14, weekday, month, year)
	case Third:
		return findDayInWeek(15, 21, weekday, month, year)
	case Fourth:
		return findDayInWeek(22, 28, weekday, month, year)
	case Teenth:
		return findDayInWeek(13, 19, weekday, month, year)
	case Last:
		lastDayOfMonth := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
		start := lastDayOfMonth - 6
		return findDayInWeek(start, lastDayOfMonth, weekday, month, year)
	default:
		panic("invalid WeekSchedule")
	}
}

func findDayInWeek(startDay, endDay int, weekday time.Weekday, month time.Month, year int) int {
	for day := startDay; day <= endDay; day++ {
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Weekday() == weekday {
			return candidate.Day()
		}
	}
	panic("no solution found")
}