package meetup

import (
	"fmt"
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
		panic(fmt.Sprintf("%v did not match a WeekSchedule", week))
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
		candidate := time.Date(year, month, day, 0, 0, 0, 0, time.UTC)
		if candidate.Weekday() == weekday {
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
		return candidate.Day() > 12 && candidate.Day() < 20
	case Last:
		lastDayOfMonth := time.Date(candidate.Year(), candidate.Month()+1, 0, 0, 0, 0, 0, time.UTC)
		return candidate.Day() > lastDayOfMonth.Day()-7
	}
	panic(fmt.Sprintf("%v did not match a WeekSchedule", week))
}