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
		day := firstOfMonth.Day() + (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7
		if day > 7 {
			day -= 7
		}
		return day
	case Second:
		day := firstOfMonth.Day() + (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7 + 7
		if day > 14 {
			day -= 7
		}
		return day
	case Third:
		day := firstOfMonth.Day() + (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7 + 14
		if day > 21 {
			day -= 7
		}
		return day
	case Fourth:
		day := firstOfMonth.Day() + (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7 + 21
		if day > 28 {
			day -= 7
		}
		return day
	case Teenth:
		teenthStart := time.Date(year, month, 13, 0, 0, 0, 0, time.UTC)
		day := teenthStart.Day() + (int(weekday) - int(teenthStart.Weekday()) + 7) % 7
		if day < 13 || day > 19 {
			day = firstOfMonth.Day() + (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7 + 12
			if day < 13 || day > 19 {
				day = firstOfMonth.Day() + (int(weekday) - int(firstOfMonth.Weekday()) + 7) % 7 + 5
			}
		}
		return day
	case Last:
		lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
		day := lastOfMonth.Day() - (int(lastOfMonth.Weekday()) - int(weekday) + 7) % 7
		if day > lastOfMonth.Day() {
			day -= 7
		}
		if day < lastOfMonth.Day()-6 {
			day += 7
		}
		return day
	default:
		return -1
	}
}