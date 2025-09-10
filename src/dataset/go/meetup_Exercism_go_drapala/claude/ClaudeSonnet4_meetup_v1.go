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
		// Find first occurrence of weekday in month
		day := 1 + int((weekday - firstOfMonth.Weekday() + 7) % 7)
		return day
	case Second:
		day := 1 + int((weekday - firstOfMonth.Weekday() + 7) % 7) + 7
		return day
	case Third:
		day := 1 + int((weekday - firstOfMonth.Weekday() + 7) % 7) + 14
		return day
	case Fourth:
		day := 1 + int((weekday - firstOfMonth.Weekday() + 7) % 7) + 21
		return day
	case Teenth:
		// Find weekday between 13th and 19th
		thirteenth := time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		day := 13 + int((weekday - thirteenth.Weekday() + 7) % 7)
		return day
	case Last:
		// Find last occurrence of weekday in month
		lastOfMonth := time.Date(year, month+1, 0, 0, 0, 0, 0, time.UTC)
		day := lastOfMonth.Day() - int((lastOfMonth.Weekday() - weekday + 7) % 7)
		return day
	}
	return -1
}