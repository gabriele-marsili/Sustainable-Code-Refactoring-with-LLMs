package booking

import (
	"fmt"
	"log"
	"time"
)

var (
	layout1 = "1/2/2006 15:04:05"
	layout2 = "January 2, 2006 15:04:05"
	layout3 = "Monday, January 2, 2006 15:04:05"
)

func Schedule(date string) time.Time {
	t, err := time.Parse(layout1, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return t
}

func HasPassed(date string) bool {
	t, err := time.Parse(layout2, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return time.Now().After(t)
}

func IsAfternoonAppointment(date string) bool {
	t, err := time.Parse(layout3, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	hour := t.Hour()
	return hour >= 12 && hour < 18
}

func Description(date string) string {
	t, err := time.Parse(layout1, date)
	if err != nil {
		log.Fatalf("failed to parse date %s, %s", date, err)
	}
	return fmt.Sprintf("You have an appointment on %s, %s %d, %d, at %d:%02d.", 
		t.Weekday(), t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}

func AnniversaryDate() time.Time {
	return time.Date(time.Now().Year(), 9, 15, 0, 0, 0, 0, time.UTC)
}