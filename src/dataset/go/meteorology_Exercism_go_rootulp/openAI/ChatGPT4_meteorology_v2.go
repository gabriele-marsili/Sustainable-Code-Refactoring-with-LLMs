package meteorology

import (
	"fmt"
)

type TemperatureUnit int

const (
	Celsius    TemperatureUnit = iota
	Fahrenheit
)

var temperatureUnitStrings = [...]string{"°C", "°F"}

func (t TemperatureUnit) String() string {
	if t < 0 || int(t) >= len(temperatureUnitStrings) {
		return "unknown"
	}
	return temperatureUnitStrings[t]
}

type Temperature struct {
	degree int
	unit   TemperatureUnit
}

func (t Temperature) String() string {
	return fmt.Sprintf("%d %s", t.degree, t.unit)
}

type SpeedUnit int

const (
	KmPerHour    SpeedUnit = iota
	MilesPerHour
)

var speedUnitStrings = [...]string{"km/h", "mph"}

func (s SpeedUnit) String() string {
	if s < 0 || int(s) >= len(speedUnitStrings) {
		return "unknown"
	}
	return speedUnitStrings[s]
}

type Speed struct {
	magnitude int
	unit      SpeedUnit
}

func (s Speed) String() string {
	return fmt.Sprintf("%d %s", s.magnitude, s.unit)
}

type MeteorologyData struct {
	location      string
	temperature   Temperature
	windDirection string
	windSpeed     Speed
	humidity      int
}

func (m MeteorologyData) String() string {
	return fmt.Sprintf("%s: %s, Wind %s at %s, %d%% Humidity", m.location, m.temperature, m.windDirection, m.windSpeed, m.humidity)
}