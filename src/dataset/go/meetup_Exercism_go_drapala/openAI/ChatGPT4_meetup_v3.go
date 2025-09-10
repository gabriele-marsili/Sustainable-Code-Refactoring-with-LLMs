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

func incrementDate(date time.Time, weekday time.Weekday, increment int) time.Time {
	for date.Weekday() != weekday {
		date = date.AddDate(0, 0, increment)
	}
	return date
}

func findDate(firstOfMonth, lastOfMonth time.Time, week WeekSchedule, weekday time.Weekday) int {
	switch week {
	case First:
		return incrementDate(firstOfMonth, weekday, 1).Day()
	case Second:
		return incrementDate(firstOfMonth.AddDate(0, 0, 7), weekday, 1).Day()
	case Third:
		return incrementDate(firstOfMonth.AddDate(0, 0, 14), weekday, 1).Day()
	case Fourth:
		return incrementDate(firstOfMonth.AddDate(0, 0, 21), weekday, 1).Day()
	case Teenth:
		return incrementDate(firstOfMonth.AddDate(0, 0, 12), weekday, 1).Day()
	case Last:
		return incrementDate(lastOfMonth, weekday, -1).Day()
	}
	return -1
}

func Day(week WeekSchedule, weekday time.Weekday, month time.Month, year int) int {
	firstOfMonth := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	return findDate(firstOfMonth, lastOfMonth, week, weekday)
}