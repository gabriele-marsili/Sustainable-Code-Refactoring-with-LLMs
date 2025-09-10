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
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)

	switch week {
	case First:
		day := firstOfMonth.Day()
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 7 {
				return -1
			}
		}
		return day
	case Second:
		day := firstOfMonth.Day() + 7
		firstOfMonth = firstOfMonth.AddDate(0, 0, 7)
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 14 {
				return -1
			}
		}
		return day
	case Third:
		day := firstOfMonth.Day() + 14
		firstOfMonth = firstOfMonth.AddDate(0, 0, 14)
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 21 {
				return -1
			}
		}
		return day
	case Fourth:
		day := firstOfMonth.Day() + 21
		firstOfMonth = firstOfMonth.AddDate(0, 0, 21)
		for firstOfMonth.Weekday() != weekday {
			firstOfMonth = firstOfMonth.AddDate(0, 0, 1)
			day++
			if day > 28 {
				return -1
			}
		}
		return day
	case Teenth:
		teenthStart := time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		day := 13
		for teenthStart.Weekday() != weekday {
			teenthStart = teenthStart.AddDate(0, 0, 1)
			day++
			if day > 19 {
				return -1
			}
		}
		return day
	case Last:
		day := lastOfMonth.Day()
		for lastOfMonth.Weekday() != weekday {
			lastOfMonth = lastOfMonth.AddDate(0, 0, -1)
			day--
			if day < 1 {
				return -1
			}
		}
		return day
	default:
		return -1
	}
}