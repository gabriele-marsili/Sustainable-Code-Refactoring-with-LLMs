// Package weather returns the current weather condition.
package weather

import "strings"

// CurrentCondition returns the current weather condition.
var CurrentCondition string
// CurrentLocation is where you're at.
var CurrentLocation string

// Forecast concatenates stuff.
func Forecast(city, condition string) string {
	CurrentLocation, CurrentCondition = city, condition
	var builder strings.Builder
	builder.Grow(len(city) + len(condition) + 32)
	builder.WriteString(city)
	builder.WriteString(" - current weather condition: ")
	builder.WriteString(condition)
	return builder.String()
}