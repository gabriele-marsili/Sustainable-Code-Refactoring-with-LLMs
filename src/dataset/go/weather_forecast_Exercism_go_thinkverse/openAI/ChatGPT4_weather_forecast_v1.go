// Package weather forecast provides the current weather condition for a given location.
package weather

import "sync"

var (
	mu                sync.RWMutex
	currentCondition  string
	currentLocation   string
)

// Forecast sets the current weather condition and location.
//
// Returns formatted string with the current weather condition and location.
func Forecast(city, condition string) string {
	mu.Lock()
	currentLocation, currentCondition = city, condition
	mu.Unlock()
	return city + " - current weather condition: " + condition
}