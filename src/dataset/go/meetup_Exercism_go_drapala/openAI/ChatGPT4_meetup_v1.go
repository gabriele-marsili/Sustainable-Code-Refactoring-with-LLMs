package meetup

import (
	"fmt"
	"strconv"
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

func findDate(firstOfMonth, lastOfMonth time.Time, week WeekSchedule, weekday time.Weekday) int {
	firstOccurrence := firstOfMonth
	for firstOccurrence.Weekday() != weekday {
		firstOccurrence = firstOccurrence.AddDate(0, 0, 1)
	}

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
		teenth := firstOccurrence
		for teenth.Day() < 13 {
			teenth = teenth.AddDate(0, 0, 7)
		}
		return teenth.Day()
	case Last:
		lastOccurrence := lastOfMonth
		for lastOccurrence.Weekday() != weekday {
			lastOccurrence = lastOccurrence.AddDate(0, 0, -1)
		}
		return lastOccurrence.Day()
	}
	return -1
}

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	firstOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	return findDate(firstOfMonth, lastOfMonth, week, weekday)
}