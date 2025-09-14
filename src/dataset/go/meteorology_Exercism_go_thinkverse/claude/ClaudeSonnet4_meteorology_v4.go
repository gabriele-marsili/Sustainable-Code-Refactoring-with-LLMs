package meteorology

import (
	"strconv"
	"strings"
)

type TemperatureUnit int

const (
	Celsius    TemperatureUnit = 0
	Fahrenheit TemperatureUnit = 1
)

var temperatureUnitStrings = [2]string{"°C", "°F"}

func (t TemperatureUnit) String() string {
	if t < 0 || int(t) >= len(temperatureUnitStrings) {
		return "°C"
	}
	return temperatureUnitStrings[t]
}

type Temperature struct {
	degree int
	unit   TemperatureUnit
}

func (t Temperature) String() string {
	var b strings.Builder
	b.Grow(16)
	b.WriteString(strconv.Itoa(t.degree))
	b.WriteByte(' ')
	b.WriteString(t.unit.String())
	return b.String()
}

type SpeedUnit int

const (
	KmPerHour    SpeedUnit = 0
	MilesPerHour SpeedUnit = 1
)

var speedUnitStrings = [2]string{"km/h", "mph"}

func (s SpeedUnit) String() string {
	if s < 0 || int(s) >= len(speedUnitStrings) {
		return "km/h"
	}
	return speedUnitStrings[s]
}

type Speed struct {
	magnitude int
	unit      SpeedUnit
}

func (s Speed) String() string {
	var b strings.Builder
	b.Grow(16)
	b.WriteString(strconv.Itoa(s.magnitude))
	b.WriteByte(' ')
	b.WriteString(s.unit.String())
	return b.String()
}

type MeteorologyData struct {
	location      string
	temperature   Temperature
	windDirection string
	windSpeed     Speed
	humidity      int
}

func (m MeteorologyData) String() string {
	var b strings.Builder
	b.Grow(128)
	b.WriteString(m.location)
	b.WriteString(": ")
	b.WriteString(m.temperature.String())
	b.WriteString(", Wind ")
	b.WriteString(m.windDirection)
	b.WriteString(" at ")
	b.WriteString(m.windSpeed.String())
	b.WriteString(", ")
	b.WriteString(strconv.Itoa(m.humidity))
	b.WriteString("% Humidity")
	return b.String()
}