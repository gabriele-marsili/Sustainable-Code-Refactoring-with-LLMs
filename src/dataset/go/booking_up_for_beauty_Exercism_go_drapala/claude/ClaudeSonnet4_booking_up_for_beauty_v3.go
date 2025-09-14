package booking

import (
	"time"
	"fmt"
)

var (
	scheduleLayout = "1/2/2006 15:04:05"
	hasPassedLayout = "January 2, 2006 15:04:05"
	afternoonLayout = "Monday, January 2, 2006 15:04:05"
	anniversaryLayout = "2006-01-02"
)

func Schedule(date string) time.Time {
	t, _ := time.Parse(scheduleLayout, date)
	return t
}

func HasPassed(date string) bool {
	t, _ := time.Parse(hasPassedLayout, date)
	return time.Now().After(t)
}

func IsAfternoonAppointment(date string) bool {
	t, _ := time.Parse(afternoonLayout, date)
	hour := t.Hour()
	return hour >= 12 && hour < 18
}

func Description(date string) string {
	t, _ := time.Parse(scheduleLayout, date)
	return fmt.Sprintf("You have an appointment on %s, %s %d, %d, at %d:%02d.", 
		t.Weekday(), t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}

func AnniversaryDate() time.Time {
	t, _ := time.Parse(anniversaryLayout, fmt.Sprintf("%d-09-15", time.Now().Year()))
	return t
}