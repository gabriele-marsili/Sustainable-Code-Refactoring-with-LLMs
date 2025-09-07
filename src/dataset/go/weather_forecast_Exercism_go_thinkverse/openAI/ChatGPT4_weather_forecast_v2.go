// Package weather provides the current weather condition for a given location.
package weather

import "sync"

// CurrentCondition stores the current weather condition.
var CurrentCondition string

// CurrentLocation stores the current location.
var CurrentLocation string

// mutex to ensure thread-safe updates to CurrentLocation and CurrentCondition.
var mutex sync.RWMutex

// Forecast sets the current weather condition and location.
//
// Returns formatted string with the current weather condition and location.
func Forecast(city, condition string) string {
	mutex.Lock()
	CurrentLocation, CurrentCondition = city, condition
	mutex.Unlock()
	return city + " - current weather condition: " + condition
}