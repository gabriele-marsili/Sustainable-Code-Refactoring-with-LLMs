package meetup

import (
	"time"
)

// Define the WeekSchedule type here.
type WeekSchedule int

// https://golangbyexample.com/iota-in-golang/
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
		day := firstOfMonth.Day()
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 7 {
				return -1 // Or handle error as appropriate
			}
		}
		return firstOfMonth.Day()
	case Second:
		firstOfMonth = firstOfMonth.AddDate(0, 0, 7)
		day := firstOfMonth.Day()
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 14 {
				return -1 // Or handle error as appropriate
			}
		}
		return firstOfMonth.Day()
	case Third:
		firstOfMonth = firstOfMonth.AddDate(0, 0, 14)
		day := firstOfMonth.Day()
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 21 {
				return -1 // Or handle error as appropriate
			}
		}
		return firstOfMonth.Day()
	case Fourth:
		firstOfMonth = firstOfMonth.AddDate(0, 0, 21)
		day := firstOfMonth.Day()
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 28 {
				return -1 // Or handle error as appropriate
			}
		}
		return firstOfMonth.Day()
	case Teenth:
		firstOfMonth = time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		day := firstOfMonth.Day()
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 19 {
				return -1 // Or handle error as appropriate
			}
		}
		return firstOfMonth.Day()
	case Last:
		lastOfMonth := firstOfMonth.AddDate(0, 1, 0).AddDate(0, 0, -1)
		day := lastOfMonth.Day()
		for lastOfMonth.Weekday() != weekday {
			lastOfMonth = lastOfMonth.AddDate(0, 0, -1)
			day--
			if day < 1 {
				return -1 // Or handle error as appropriate
			}
		}
		return lastOfMonth.Day()
	default:
		return -1
	}
}