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

	month, _ := strconv.Atoi(parts[0])
	day, _ := strconv.Atoi(parts[1])
	yearParts := strings.Split(parts[2], " ")
	year, _ := strconv.Atoi(yearParts[0])

	timeParts := strings.Split(yearParts[1], ":")
	hour, _ := strconv.Atoi(timeParts[0])
	minute, _ := strconv.Atoi(timeParts[1])
	second, _ := strconv.Atoi(timeParts[2])

	return time.Date(year, time.Month(month), day, hour, minute, second, 0, time.Local)
}

// HasPassed returns whether a date has passed
func HasPassed(date string) bool {
	parts := strings.Split(date, ", ")
	if len(parts) != 2 {
		return false // Or handle the error appropriately
	}

	dateParts := strings.Split(parts[1], " ")
	monthStr := dateParts[0]
	dayStr := strings.TrimSuffix(dateParts[1], ",")
	yearParts := strings.Split(dateParts[2], " ")
	yearStr := yearParts[0]
	timeStr := yearParts[1]

	month, err := parseMonth(monthStr)
	if err != nil {
		return false
	}

	day, _ := strconv.Atoi(dayStr)
	year, _ := strconv.Atoi(yearStr)

	timeParts := strings.Split(timeStr, ":")
	hour, _ := strconv.Atoi(timeParts[0])
	minute, _ := strconv.Atoi(timeParts[1])
	second, _ := strconv.Atoi(timeParts[2])

	t := time.Date(year, month, day, hour, minute, second, 0, time.Local)
	fmt.Println(time.Now().Sub(t))
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
	parts := strings.Split(date, ", ")
	if len(parts) != 2 {
		return false
	}

	timeParts := strings.Split(parts[1], " ")
	hourStr := strings.Split(timeParts[2], ":")[0]

	hour, _ := strconv.Atoi(hourStr)

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
	return time.Date(year, time.September, 15, 0, 0, 0, 0, time.Local)
}