package meteorology

import (
	"fmt"
)

type TemperatureUnit int

const (
	Celsius    TemperatureUnit = 0
	Fahrenheit TemperatureUnit = 1
)

var temperatureUnitStrings = [...]string{
	"°C",
	"°F",
}

func (t TemperatureUnit) String() string {
	if t >= 0 && t < TemperatureUnit(len(temperatureUnitStrings)) {
		return temperatureUnitStrings[t]
	}
	return fmt.Sprintf("unrecognized temperature unit %d", t)
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
	KmPerHour    SpeedUnit = 0
	MilesPerHour SpeedUnit = 1
)

var speedUnitStrings = [...]string{
	"km/h",
	"mph",
}

func (s SpeedUnit) String() string {
	if s >= 0 && s < SpeedUnit(len(speedUnitStrings)) {
		return speedUnitStrings[s]
	}
	return fmt.Sprintf("unrecognized speed unit %d", s)
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