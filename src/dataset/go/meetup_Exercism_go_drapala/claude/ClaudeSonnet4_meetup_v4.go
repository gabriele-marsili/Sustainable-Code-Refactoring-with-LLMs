package meetup

import (
	"time"
)

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
		return findTeenthOccurrence(firstOfMonth, weekday)
	case Last:
		return findLastOccurrence(firstOfMonth, weekday)
	}
	return -1
}

func findFirstOccurrence(firstOfMonth time.Time, weekday time.Weekday) int {
	dayDiff := int(weekday - firstOfMonth.Weekday())
	if dayDiff < 0 {
		dayDiff += 7
	}
	return 1 + dayDiff
}

func findTeenthOccurrence(firstOfMonth time.Time, weekday time.Weekday) int {
	thirteenth := firstOfMonth.AddDate(0, 0, 12)
	dayDiff := int(weekday - thirteenth.Weekday())
	if dayDiff < 0 {
		dayDiff += 7
	}
	return 13 + dayDiff
}

func findLastOccurrence(firstOfMonth time.Time, weekday time.Weekday) int {
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	dayDiff := int(lastOfMonth.Weekday() - weekday)
	if dayDiff < 0 {
		dayDiff += 7
	}
	return lastOfMonth.Day() - dayDiff
}