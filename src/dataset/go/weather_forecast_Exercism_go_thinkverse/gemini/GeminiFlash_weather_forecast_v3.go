// Package weather forcast provides the current weather condition for a given location.
package weather

import (
	"strings"
	"sync"
)

// CurrentCondition stores the current weather condition.
var CurrentCondition string

// CurrentLocation stores the current location.
var CurrentLocation string

var (
	mu sync.RWMutex
)

// Forecast set the current weather condition and location.
//
// Returns formatted string with the current weather condition and location.
func Forecast(city, condition string) string {
	mu.Lock()
	CurrentLocation = city
	CurrentCondition = condition
	mu.Unlock()

	var sb strings.Builder
	sb.Grow(len(city) + len(" - current weather condition: ") + len(condition))
	sb.WriteString(city)
	sb.WriteString(" - current weather condition: ")
	sb.WriteString(condition)
	return sb.String()
}