package meetup

import (
	"fmt"
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

func findDate(firstOfMonth, lastOfMonth time.Time, week WeekSchedule, weekday time.Weekday) int {
	dayOffset := (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7
	firstOccurrence := firstOfMonth.AddDate(0, 0, dayOffset)

	switch week {
	case First:
		return firstOccurrence.Day()
	case Second:
		return firstOccurrence.AddDate(0, 0, 7).Day()
	case Third:
		return firstOccurrence.AddDate(0, 0, 14).Day()
	case Fourth:
		return firstOccurrence.AddDate(0, 0, 21).Day()
	case Teenth:
		teenthStart := firstOfMonth.AddDate(0, 0, 12)
		dayOffset = (int(weekday) - int(teenthStart.Weekday()) + 7) % 7
		return teenthStart.AddDate(0, 0, dayOffset).Day()
	case Last:
		dayOffset = (int(lastOfMonth.Weekday()) - int(weekday) + 7) % 7
		return lastOfMonth.AddDate(0, 0, -dayOffset).Day()
	}
	return -1
}

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	firstOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	return findDate(firstOfMonth, lastOfMonth, week, weekday)
}