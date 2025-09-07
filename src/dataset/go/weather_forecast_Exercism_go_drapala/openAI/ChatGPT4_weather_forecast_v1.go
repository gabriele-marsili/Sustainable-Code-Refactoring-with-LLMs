// Package weather returns the current weather condition.
package weather

import "sync"

// CurrentCondition returns the current weather condition.
var (
	CurrentCondition string
	CurrentLocation  string
	mu               sync.RWMutex
)

// Forecast concatenates stuff.
func Forecast(city, condition string) string {
	mu.Lock()
	CurrentLocation, CurrentCondition = city, condition
	mu.Unlock()
	return city + " - current weather condition: " + condition
}