package booking

import (
	"fmt"
	"time"
)

const (
	scheduleLayout      = "1/02/2006 15:04:05"
	hasPassedLayout     = "January 2, 2006 15:04:05"
	isAfternoonLayout   = "Monday, January 2, 2006 15:04:05"
	descriptionLayout   = "1/2/2006 15:04:05"
	anniversaryMonth    = time.September
	anniversaryDay      = 15
	anniversaryHour     = 0
	anniversaryMinute   = 0
	anniversarySecond   = 0
	anniversaryNanosecond = 0
)

var anniversaryLocation = time.UTC

// Schedule returns a time.Time from a string containing a date
func Schedule(date string) time.Time {
	t, _ := time.Parse(scheduleLayout, date)
	return t
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	t, _ := time.Parse(hasPassedLayout, date)
	return time.Now().After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	t, _ := time.Parse(isAfternoonLayout, date)
	hour := t.Hour()
	return hour >= 12 && hour < 18
}

// Description returns a formatted string of the appointment time
func Description(date string) string {
	t, _ := time.Parse(descriptionLayout, date)
	return fmt.Sprintf("You have an appointment on %s", t.Format("Monday, January 2, 2006, at 15:04."))
}

// AnniversaryDate returns a Time with this year's anniversary
func AnniversaryDate() time.Time {
	now := time.Now()
	return time.Date(now.Year(), anniversaryMonth, anniversaryDay, anniversaryHour, anniversaryMinute, anniversarySecond, anniversaryNanosecond, anniversaryLocation)
}