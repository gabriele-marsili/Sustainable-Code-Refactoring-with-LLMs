// Package weather forcast provides the current weather condition for a given location.
package weather

import "strings"

// ForecastData stores the current weather condition and location.
type ForecastData struct {
	Location  string
	Condition string
}

// currentForecast stores the current forecast data.
var currentForecast ForecastData

// Forecast set the current weather condition and location.
//
// Returns formatted string with the current weather condition and location.
func Forecast(city, condition string) string {
	currentForecast.Location = city
	currentForecast.Condition = condition
	var sb strings.Builder
	sb.Grow(len(city) + len(condition) + 35) // Pre-allocate memory
	sb.WriteString(city)
	sb.WriteString(" - current weather condition: ")
	sb.WriteString(condition)
	return sb.String()
}