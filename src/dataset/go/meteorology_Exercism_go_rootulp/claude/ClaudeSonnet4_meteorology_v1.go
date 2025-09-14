package meteorology

import (
	"log"
	"strconv"
)

type TemperatureUnit int

const (
	Celsius    TemperatureUnit = 0
	Fahrenheit TemperatureUnit = 1
)

var temperatureUnitStrings = [2]string{"°C", "°F"}

func (t TemperatureUnit) String() string {
	if t >= 0 && int(t) < len(temperatureUnitStrings) {
		return temperatureUnitStrings[t]
	}
	log.Fatalf("unrecognized temperature unit %d", t)
	return ""
}

type Temperature struct {
	degree int
	unit   TemperatureUnit
}

func (t Temperature) String() string {
	return strconv.Itoa(t.degree) + " " + t.unit.String()
}

type SpeedUnit int

const (
	KmPerHour    SpeedUnit = 0
	MilesPerHour SpeedUnit = 1
)

var speedUnitStrings = [2]string{"km/h", "mph"}

func (s SpeedUnit) String() string {
	if s >= 0 && int(s) < len(speedUnitStrings) {
		return speedUnitStrings[s]
	}
	log.Fatalf("unrecognized speed unit %d", s)
	return ""
}

type Speed struct {
	magnitude int
	unit      SpeedUnit
}

func (s Speed) String() string {
	return strconv.Itoa(s.magnitude) + " " + s.unit.String()
}

type MeteorologyData struct {
	location      string
	temperature   Temperature
	windDirection string
	windSpeed     Speed
	humidity      int
}

func (m MeteorologyData) String() string {
	return m.location + ": " + m.temperature.String() + ", Wind " + m.windDirection + " at " + m.windSpeed.String() + ", " + strconv.Itoa(m.humidity) + "% Humidity"
}