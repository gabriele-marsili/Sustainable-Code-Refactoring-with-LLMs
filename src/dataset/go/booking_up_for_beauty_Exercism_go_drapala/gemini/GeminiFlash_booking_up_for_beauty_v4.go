package booking

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

// Schedule returns a time.Time from a string containing a date
func Schedule(date string) time.Time {
	parts := strings.Split(date, "/")
	if len(parts) != 3 {
		return time.Time{} // Or handle the error appropriately
	}

	month, err := strconv.Atoi(parts[0])
	if err != nil {
		return time.Time{}
	}

	day, err := strconv.Atoi(parts[1])
	if err != nil {
		return time.Time{}
	}

	year, err := strconv.Atoi(parts[2][:4])
	if err != nil {
		return time.Time{}
	}

	hour, err := strconv.Atoi(parts[2][5:7])
	if err != nil {
		return time.Time{}
	}

	minute, err := strconv.Atoi(parts[2][8:10])
	if err != nil {
		return time.Time{}
	}

	second, err := strconv.Atoi(parts[2][11:])
	if err != nil {
		return time.Time{}
	}

	return time.Date(year, time.Month(month), day, hour, minute, second, 0, time.UTC)
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	parts := strings.Split(date, " ")
	if len(parts) < 4 {
		return false
	}

	monthStr := parts[0]
	dayStr := strings.TrimSuffix(parts[1], ",")
	yearStr := parts[3]
	timeStr := parts[2]

	month, err := parseMonth(monthStr)
	if err != nil {
		return false
	}

	day, err := strconv.Atoi(dayStr)
	if err != nil {
		return false
	}

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		return false
	}

	timeParts := strings.Split(timeStr, ":")
	if len(timeParts) != 3 {
		return false
	}

	hour, err := strconv.Atoi(timeParts[0])
	if err != nil {
		return false
	}

	minute, err := strconv.Atoi(timeParts[1])
	if err != nil {
		return false
	}

	second, err := strconv.Atoi(timeParts[2])
	if err != nil {
		return false
	}

	t := time.Date(year, month, day, hour, minute, second, 0, time.UTC)
	return time.Now().After(t)
}

func parseMonth(monthStr string) (time.Month, error) {
	switch monthStr {
	case "January":
		return time.January, nil
	case "February":
		return time.February, nil
	case "March":
		return time.March, nil
	case "April":
		return time.April, nil
	case "May":
		return time.May, nil
	case "June":
		return time.June, nil
	case "July":
		return time.July, nil
	case "August":
		return time.August, nil
	case "September":
		return time.September, nil
	case "October":
		return time.October, nil
	case "November":
		return time.November, nil
	case "December":
		return time.December, nil
	default:
		return time.Month(0), fmt.Errorf("invalid month: %s", monthStr)
	}
}

// IsAfternoonAppointment returns whether a time is in the afternoon
func IsAfternoonAppointment(date string) bool {
	parts := strings.Split(date, " ")
	if len(parts) < 5 {
		return false
	}

	timeStr := parts[4]

	timeParts := strings.Split(timeStr, ":")
	if len(timeParts) != 3 {
		return false
	}

	hour, err := strconv.Atoi(timeParts[0])
	if err != nil {
		return false
	}

	return hour >= 12 && hour < 18
}

// Description returns a formatted string of the appointment time
func Description(date string) string {
	t := Schedule(date)
	return fmt.Sprintf("You have an appointment on %s, %s %d, %d, at %02d:%02d.", t.Weekday(), t.Month(), t.Day(), t.Year(), t.Hour(), t.Minute())
}

// AnniversaryDate returns a Time with this year's anniversary
func AnniversaryDate() time.Time {
	year := time.Now().Year()
	return time.Date(year, time.September, 15, 0, 0, 0, 0, time.UTC)
}