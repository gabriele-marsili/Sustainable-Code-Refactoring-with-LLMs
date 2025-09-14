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
	month, _ := strconv.Atoi(date[0:1])
	day, _ := strconv.Atoi(date[2:4])
	hour, _ := strconv.Atoi(date[11:13])
	minute, _ := strconv.Atoi(date[14:16])
	second, _ := strconv.Atoi(date[17:19])

	return time.Date(year, time.Month(month), day, hour, minute, second, 0, time.UTC)
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	// Convert date: July 25, 2019 13:45:00
	parts := strings.Split(date, " ")
	monthStr := parts[0]
	dayStr := strings.TrimSuffix(parts[1], ",")
	yearStr := parts[2]
	timeStr := parts[3]

	month, _ := time.Parse("January", monthStr)
	day, _ := strconv.Atoi(dayStr)
	year, _ := strconv.Atoi(yearStr)

	timeParts := strings.Split(timeStr, ":")
	hour, _ := strconv.Atoi(timeParts[0])
	minute, _ := strconv.Atoi(timeParts[1])
	second, _ := strconv.Atoi(timeParts[2])

	t := time.Date(year, month.Month(), day, hour, minute, second, 0, time.Local)

	return time.Now().After(t)
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	// Convert date: Thursday, July 25, 2019 13:45:00
	parts := strings.Split(date, " ")
	timeStr := parts[4]

	timeParts := strings.Split(timeStr, ":")
	hour, _ := strconv.Atoi(timeParts[0])

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