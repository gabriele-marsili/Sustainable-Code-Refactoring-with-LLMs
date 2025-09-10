package meetup

import (
	"time"
)

// Define the WeekSchedule type here.
type WeekSchedule int

const (
	First WeekSchedule = iota
	Second
	Third
	Fourth
	Teenth
	Last
)

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	firstOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)

	switch week {
	case First:
		return findDayOfMonth(firstOfMonth, weekday, 1)
	case Second:
		return findDayOfMonth(firstOfMonth, weekday, 8)
	case Third:
		return findDayOfMonth(firstOfMonth, weekday, 15)
	case Fourth:
		return findDayOfMonth(firstOfMonth, weekday, 22)
	case Teenth:
		teenthStart := time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		for i := 0; i < 7; i++ {
			currentDate := teenthStart.AddDate(0, 0, i)
			if currentDate.Weekday() == weekday {
				return currentDate.Day()
			}
		}
		return -1 // Should never happen
	case Last:
		for i := 0; i < 7; i++ {
			currentDate := lastOfMonth.AddDate(0, 0, -i)
			if currentDate.Weekday() == weekday {
				return currentDate.Day()
			}
		}
		return -1 // Should never happen
	default:
		return -1
	}
}

func findDayOfMonth(firstOfMonth time.Time, weekday time.Weekday, dayOfMonth int) int {
	targetDate := time.Date(firstOfMonth.Year(), firstOfMonth.Month(), dayOfMonth, 0, 0, 0, 0, time.UTC)
	daysToAdd := (weekday - targetDate.Weekday() + 7) % 7
	return targetDate.AddDate(0, 0, int(daysToAdd)).Day()
}