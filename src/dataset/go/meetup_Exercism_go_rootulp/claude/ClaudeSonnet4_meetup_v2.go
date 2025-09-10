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
	default:
		panic("invalid WeekSchedule")
	}
	
	for day := startDay; day <= endDay; day++ {
		if day > 31 {
			break
		}
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Month() == month && candidate.Weekday() == weekday {
			return day
		}
	}
	panic("no solution found")
}