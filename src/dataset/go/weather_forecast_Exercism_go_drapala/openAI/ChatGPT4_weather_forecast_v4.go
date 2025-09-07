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
	var sb strings.Builder
	sb.Grow(len(city) + len(condition) + 31) // Preallocate memory
	sb.WriteString(city)
	sb.WriteString(" - current weather condition: ")
	sb.WriteString(condition)
	return sb.String()
}