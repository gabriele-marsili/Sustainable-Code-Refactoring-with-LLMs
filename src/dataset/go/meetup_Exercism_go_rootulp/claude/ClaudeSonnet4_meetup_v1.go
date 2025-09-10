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
		return findDayInRange(1, 7, weekday, month, year)
	case Second:
		return findDayInRange(8, 14, weekday, month, year)
	case Third:
		return findDayInRange(15, 21, weekday, month, year)
	case Fourth:
		return findDayInRange(22, 28, weekday, month, year)
	case Teenth:
		return findDayInRange(13, 19, weekday, month, year)
	case Last:
		return findLastWeekday(weekday, month, year)
	}
	panic("invalid WeekSchedule")
}

func findDayInRange(start, end int, weekday time.Weekday, month time.Month, year int) int {
	for day := start; day <= end; day++ {
		if time.Date(year, month, day, 0, 0, 0, 0, time.UTC).Weekday() == weekday {
			return day
		}
	}
	panic("no solution found")
}

func findLastWeekday(weekday time.Weekday, month time.Month, year int) int {
	lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC).Day()
	for day := lastDay; day > lastDay-7; day-- {
		if time.Date(year, month, day, 0, 0, 0, 0, time.UTC).Weekday() == weekday {
			return day
		}
	}
	panic("no solution found")
}