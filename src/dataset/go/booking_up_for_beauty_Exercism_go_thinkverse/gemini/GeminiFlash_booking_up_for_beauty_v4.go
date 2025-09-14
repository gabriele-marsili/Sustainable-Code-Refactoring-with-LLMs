package booking

import (
	"fmt"
	"sync"
	"time"
)

var (
	scheduleParseLayout         = "1/02/2006 15:04:05"
	hasPassedParseLayout        = "January 2, 2006 15:04:05"
	isAfternoonParseLayout      = "Monday, January 2, 2006 15:04:05"
	descriptionParseLayout      = "1/2/2006 15:04:05"
	descriptionFormatLayout     = "Monday, January 2, 2006, at 15:04."
	anniversaryDate             time.Time
	anniversaryDateInitialized  bool
	anniversaryDateInitialization sync.Once
)

// Schedule returns a time.Time from a string containing a date
func Schedule(date string) time.Time {
	t, _ := time.Parse(scheduleParseLayout, date)
	return t
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	t, _ := time.Parse(hasPassedParseLayout, date)
	return time.Now().After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	t, _ := time.Parse(isAfternoonParseLayout, date)
	hour := t.Hour()
	return hour >= 12 && hour < 18
}

// Description returns a formatted string of the appointment time
func Description(date string) string {
	t, _ := time.Parse(descriptionParseLayout, date)
	return fmt.Sprintf("You have an appointment on %s", t.Format(descriptionFormatLayout))
}

// AnniversaryDate returns a Time with this year's anniversary
func AnniversaryDate() time.Time {
	anniversaryDateInitialization.Do(func() {
		now := time.Now()
		anniversaryDate = time.Date(now.Year(), time.September, 15, 0, 0, 0, 0, time.UTC)
		// Handle the case where the anniversary has already passed this year.
		if anniversaryDate.Before(now) {
			anniversaryDate = time.Date(now.Year()+1, time.September, 15, 0, 0, 0, 0, time.UTC)
		}
		anniversaryDateInitialized = true
	})
	return anniversaryDate
}