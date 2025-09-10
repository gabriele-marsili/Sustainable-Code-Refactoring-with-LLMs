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
		return findDayInWeek(day, start, 0)
	case Second:
		return findDayInWeek(day, start, 7)
	case Third:
		return findDayInWeek(day, start, 14)
	case Fourth:
		return findDayInWeek(day, start, 21)
	case Teenth:
		return findDayInWeek(day, start, 12)
	case Last:
		lastDay := start.AddDate(0, 1, -1)
		return findDayInWeekReverse(day, lastDay)
	default:
		return 0
	}
}

func findDayInWeek(day time.Weekday, start time.Time, offset int) int {
	current := start.AddDate(0, 0, offset)
	daysToAdd := (int(day) - int(current.Weekday()) + 7) % 7
	return current.AddDate(0, 0, daysToAdd).Day()
}

func findDayInWeekReverse(day time.Weekday, lastDay time.Time) int {
	daysToSubtract := (int(lastDay.Weekday()) - int(day) + 7) % 7
	return lastDay.AddDate(0, 0, -daysToSubtract).Day()
}

func dayInWeek(day time.Weekday, start time.Time, reverse bool) time.Time {
	if reverse {
		daysToSubtract := (int(start.Weekday()) - int(day) + 7) % 7
		return start.AddDate(0, 0, -daysToSubtract)
	}
	daysToAdd := (int(day) - int(start.Weekday()) + 7) % 7
	return start.AddDate(0, 0, daysToAdd)
}