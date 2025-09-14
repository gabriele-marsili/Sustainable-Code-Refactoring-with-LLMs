package booking

import (
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"
)

var (
	scheduleLayout          = "1/2/2006 15:04:05"
	hasPassedLayout         = "January 2, 2006 15:04:05"
	isAfternoonLayout       = "Monday, January 2, 2006 15:04:05"
	descriptionLayout       = "1/2/2006 15:04:05"
	anniversaryMonth time.Month = 9
	anniversaryDay   int        = 15
)

// Schedule returns a time.Time from a string containing a date
// Example date October 3, 2019 20:32:00
func Schedule(date string) time.Time {
	t, err := time.Parse(scheduleLayout, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return t
}

// HasPassed returns whether a date has passed
// Example date Thursday, May 13, 2010 20:32:00
func HasPassed(date string) bool {
	t, err := time.Parse(hasPassedLayout, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return time.Now().After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
// Example date Thursday, May 13, 2010 20:32:00
func IsAfternoonAppointment(date string) bool {
	t, err := time.Parse(isAfternoonLayout, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	hour := t.Hour()
	return hour >= 12 && hour <= 18
}

// Description returns a formatted string of the appointment time
// Example date 6/6/2005 10:30:00
func Description(date string) string {
	t, err := time.Parse(descriptionLayout, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}

	var sb strings.Builder
	sb.WriteString("You have an appointment on ")
	sb.WriteString(t.Weekday().String())
	sb.WriteString(", ")
	sb.WriteString(t.Month().String())
	sb.WriteString(" ")
	sb.WriteString(strconv.Itoa(t.Day()))
	sb.WriteString(", ")
	sb.WriteString(strconv.Itoa(t.Year()))
	sb.WriteString(", at ")
	sb.WriteString(strconv.Itoa(t.Hour()))
	sb.WriteString(":")
	minuteStr := strconv.Itoa(t.Minute())
	if t.Minute() < 10 {
		sb.WriteString("0")
	}
	sb.WriteString(minuteStr)
	sb.WriteString(".")

	return sb.String()
}

// AnniversaryDate returns a Time with this year's anniversary
// Salon opened on September 15th in 2012
func AnniversaryDate() time.Time {
	now := time.Now()
	return time.Date(now.Year(), anniversaryMonth, anniversaryDay, 0, 0, 0, 0, time.UTC)
}