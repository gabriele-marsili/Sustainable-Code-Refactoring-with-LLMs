package booking

import (
	"fmt"
	"log"
	"time"
)

var (
	now = time.Now()
	currentYear = now.Year()
)

// Schedule returns a time.Time from a string containing a date
// Example date October 3, 2019 20:32:00
func Schedule(date string) time.Time {
	t, err := time.Parse("1/2/2006 15:04:05", date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return t
}

// HasPassed returns whether a date has passed
// Example date Thursday, May 13, 2010 20:32:00
func HasPassed(date string) bool {
	t, err := time.Parse("January 2, 2006 15:04:05", date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return now.After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
// Example date Thursday, May 13, 2010 20:32:00
func IsAfternoonAppointment(date string) bool {
	t, err := time.Parse("Monday, January 2, 2006 15:04:05", date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	hour := t.Hour()
	return hour >= 12 && hour <= 18
}

// Description returns a formatted string of the appointment time
// Example date 6/6/2005 10:30:00
func Description(date string) string {
	t, err := time.Parse("1/2/2006 15:04:05", date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return fmt.Sprintf("You have an appointment on %s, %s %d, %d, at %d:%d.", 
		t.Weekday(), t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}

// AnniversaryDate returns a Time with this year's anniversary
// Salon opened on September 15th in 2012
func AnniversaryDate() time.Time {
	return time.Date(currentYear, 9, 15, 0, 0, 0, 0, time.UTC)
}