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
	CurrentLocation, CurrentCondition = city, condition
	var builder strings.Builder
	builder.Grow(len(city) + len(condition) + 32)
	builder.WriteString(city)
	builder.WriteString(" - current weather condition: ")
	builder.WriteString(condition)
	return builder.String()
}