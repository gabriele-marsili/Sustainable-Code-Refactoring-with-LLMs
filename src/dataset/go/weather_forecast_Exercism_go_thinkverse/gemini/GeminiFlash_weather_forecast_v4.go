// Package weather forcast provides the current weather condition for a given location.
package weather

import "strings"

// CurrentCondition stores the current weather condition.
var CurrentCondition string

// CurrentLocation stores the current location.
var CurrentLocation string

// Forecast set the current weather condition and location.
//
// Returns formatted string with the current weather condition and location.
func Forecast(city, condition string) string {
	CurrentLocation = city
	CurrentCondition = condition
	var sb strings.Builder
	sb.Grow(len(city) + len(condition) + 35) // Pre-allocate memory
	sb.WriteString(city)
	sb.WriteString(" - current weather condition: ")
	sb.WriteString(condition)
	return sb.String()
}