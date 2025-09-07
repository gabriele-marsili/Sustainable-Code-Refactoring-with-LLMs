// Package weather provides functionality to get the current weather condition.
package weather

import "fmt"

// CurrentCondition holds the current weather condition.
var CurrentCondition string
// CurrentLocation holds the current location.
var CurrentLocation string

// Forecast updates the current location and condition, and returns the forecast string.
func Forecast(city, condition string) string {
	CurrentLocation = city
	CurrentCondition = condition
	return fmt.Sprintf("%s - current weather condition: %s", CurrentLocation, CurrentCondition)
}