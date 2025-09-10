package booking

import (
	"fmt"
	"time"
)

// Schedule returns a time.Time from a string containing a date
func Schedule(date string) time.Time {
	t, err := time.Parse("1/2/2006 15:04:05", date)
	if err != nil {
		panic(fmt.Sprintf("failed to parse date %s, %s", date, err))
	}
	return t
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	t, err := time.Parse("January 2, 2006 15:04:05", date)
	if err != nil {
		panic(fmt.Sprintf("failed to parse date %s, %s", date, err))
	}
	return time.Now().After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	t, err := time.Parse("Monday, January 2, 2006 15:04:05", date)
	if err != nil {
		panic(fmt.Sprintf("failed to parse date %s, %s", date, err))
	}
	hour := t.Hour()
	return hour >= 12 && hour <= 18
}

// Description returns a formatted string of the appointment time
func Description(date string) string {
	t, err := time.Parse("1/2/2006 15:04:05", date)
	if err != nil {
		panic(fmt.Sprintf("failed to parse date %s, %s", date, err))
	}
	return fmt.Sprintf("You have an appointment on %s, %s %d, %d, at %02d:%02d.", t.Weekday(), t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}

// AnniversaryDate returns a Time with this year's anniversary
func AnniversaryDate() time.Time {
	now := time.Now()
	return time.Date(now.Year(), time.September, 15, 0, 0, 0, 0, time.UTC)
}