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
	startDay, endDay := getWeekRange(week, month, year)
	for day := startDay; day <= endDay; day++ {
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Weekday() == weekday {
			return candidate.Day()
		}
	}
	panic("no solution found")
}

func getWeekRange(week WeekSchedule, month time.Month, year int) (int, int) {
	switch week {
	case First:
		return 1, 7
	case Second:
		return 8, 14
	case Third:
		return 15, 21
	case Fourth:
		return 22, 28
	case Teenth:
		return 13, 19
	case Last:
		lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
		return lastDay - 6, lastDay
	}
	panic("invalid WeekSchedule")
}