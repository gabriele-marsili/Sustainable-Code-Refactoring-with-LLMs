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
	switch week {
	case First:
		return findNthWeekday(year, month, weekday, 1)
	case Second:
		return findNthWeekday(year, month, weekday, 2)
	case Third:
		return findNthWeekday(year, month, weekday, 3)
	case Fourth:
		return findNthWeekday(year, month, weekday, 4)
	case Teenth:
		return findTeenthWeekday(year, month, weekday)
	case Last:
		return findLastWeekday(year, month, weekday)
	default:
		panic("invalid WeekSchedule")
	}
}

func findNthWeekday(year int, month time.Month, weekday time.Weekday, n int) int {
	firstDay := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	firstWeekday := firstDay.Weekday()
	
	daysToAdd := int(weekday - firstWeekday)
	if daysToAdd < 0 {
		daysToAdd += 7
	}
	
	targetDay := 1 + daysToAdd + (n-1)*7
	return targetDay
}

func findTeenthWeekday(year int, month time.Month, weekday time.Weekday) int {
	for day := 13; day <= 19; day++ {
		if time.Date(year, month, day, 0, 0, 0, 0, time.UTC).Weekday() == weekday {
			return day
		}
	}
	panic("no solution found")
}

func findLastWeekday(year int, month time.Month, weekday time.Weekday) int {
	lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC)
	lastDayNum := lastDay.Day()
	lastWeekday := lastDay.Weekday()
	
	daysToSubtract := int(lastWeekday - weekday)
	if daysToSubtract < 0 {
		daysToSubtract += 7
	}
	
	return lastDayNum - daysToSubtract
}