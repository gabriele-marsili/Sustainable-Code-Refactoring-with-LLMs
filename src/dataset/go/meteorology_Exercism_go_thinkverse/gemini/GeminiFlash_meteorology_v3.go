package meteorology

import "fmt"

type TemperatureUnit int

const (
	Celsius    TemperatureUnit = 0
	Fahrenheit TemperatureUnit = 1
)

var temperatureUnitStrings = [...]string{"°C", "°F"}

// Add a String method to the TemperatureUnit type
func (t TemperatureUnit) String() string {
	if t >= 0 && int(t) < len(temperatureUnitStrings) {
		return temperatureUnitStrings[t]
	}
	return "°C" // Default to Celsius if out of range
}

type Temperature struct {
	degree int
	unit   TemperatureUnit
}

// Add a String method to the Temperature type
func (t Temperature) String() string {
	return fmt.Sprintf("%d %s", t.degree, t.unit)
}

type SpeedUnit int

const (
	KmPerHour    SpeedUnit = 0
	MilesPerHour SpeedUnit = 1
)

var speedUnitStrings = [...]string{"km/h", "mph"}

// Add a String method to SpeedUnit
func (s SpeedUnit) String() string {
	if s >= 0 && int(s) < len(speedUnitStrings) {
		return speedUnitStrings[s]
	}
	return "km/h" // Default to KmPerHour if out of range
}

type Speed struct {
	magnitude int
	unit      SpeedUnit
}

// Add a String method to Speed
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

// Add a String method to MeteorologyData
func (m MeteorologyData) String() string {
	return fmt.Sprintf("%s: %s, Wind %s at %s, %d%% Humidity",
		m.location, m.temperature, m.windDirection, m.windSpeed, m.humidity,
	)
}