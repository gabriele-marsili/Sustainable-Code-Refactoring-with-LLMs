package meetup

import (
	"time"
)

// Define the WeekSchedule type here.
type WeekSchedule int

// https://golangbyexample.com/iota-in-golang/
const (
    First = iota
	// Find first occurrence after firstOfMonth
	Second
	// First occurence + 7
	Third
	// First occurence + 14
	Fourth 
	// First occurence + 21 (must exist since we don't return errors)
	Teenth
	// Between 13th to 19th only (inclusive)
	Last 
	// Start at lastOfMonth and work backwards
)

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	firstOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	
	switch week {
	case First:
		return findFirstOccurrence(firstOfMonth, weekday)
	case Second:
		first := findFirstOccurrence(firstOfMonth, weekday)
		return first + 7
	case Third:
		first := findFirstOccurrence(firstOfMonth, weekday)
		return first + 14
	case Fourth:
		first := findFirstOccurrence(firstOfMonth, weekday)
		return first + 21
	case Teenth:
		// Find weekday between 13th-19th
		for day := 13; day <= 19; day++ {
			if time.Date(year, month, day, 0, 0, 0, 0, time.UTC).Weekday() == weekday {
				return day
			}
		}
	case Last:
		// Start from last day of month and work backwards
		lastOfMonth := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC)
		for day := lastOfMonth.Day(); day >= 1; day-- {
			if time.Date(year, month, day, 0, 0, 0, 0, time.UTC).Weekday() == weekday {
				return day
			}
		}
	}
	return -1
}

func findFirstOccurrence(firstOfMonth time.Time, weekday time.Weekday) int {
	firstWeekday := firstOfMonth.Weekday()
	daysToAdd := int(weekday - firstWeekday)
	if daysToAdd < 0 {
		daysToAdd += 7
	}
	return 1 + daysToAdd
}