// Package weather forcast provides the current weather condition for a given location.
package weather

import "strings"

// Forecast set the current weather condition and location.
//
// Returns formatted string with the current weather condition and location.
func Forecast(city, condition string) string {
	var sb strings.Builder
	sb.WriteString(city)
	sb.WriteString(" - current weather condition: ")
	sb.WriteString(condition)
	return sb.String()
}