package booking

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

// Schedule returns a time.Time from a string containing a date
func Schedule(date string) time.Time {
	// 7/25/2019 13:45:00
	year, _ := strconv.Atoi(date[6:10])
	monthInt, _ := strconv.Atoi(date[0:strings.Index(date, "/")])
	dayInt, _ := strconv.Atoi(date[strings.Index(date, "/")+1:strings.LastIndex(date, "/")])
	hourInt, _ := strconv.Atoi(date[strings.LastIndex(date, "/")+1:strings.Index(date, ":")])
	minuteInt, _ := strconv.Atoi(date[strings.Index(date, ":")+1:strings.LastIndex(date, ":")])
	secondInt, _ := strconv.Atoi(date[strings.LastIndex(date, ":")+1:])

	return time.Date(year, time.Month(monthInt), dayInt, hourInt, minuteInt, secondInt, 0, time.UTC)
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	layout := "January 2, 2006 15:04:05"
	t, err := time.Parse(layout, date)
	if err != nil {
		return false // Handle parsing errors gracefully
	}
	return time.Now().After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	layout := "Monday, January 2, 2006 15:04:05"
	t, err := time.Parse(layout, date)
	if err != nil {
		return false // Handle parsing errors gracefully
	}
	hour := t.Hour()
	return hour >= 12 && hour < 18
}

// Description returns a formatted string of the appointment time
func Description(date string) string {
	t := Schedule(date)
	return fmt.Sprintf("You have an appointment on %s, %s %d, %d, at %02d:%02d.", t.Weekday(), t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}

// AnniversaryDate returns a Time with this year's anniversary
func AnniversaryDate() time.Time {
	now := time.Now()
	return time.Date(now.Year(), time.September, 15, 0, 0, 0, 0, time.UTC)
}