package elon

import "fmt"

// Drive drives the Car one time, if there is not enough
// battery to drive on more time, the car will not move
func (c *Car) Drive() {
	if c.battery >= c.batteryDrain {
		c.distance += c.speed
		c.battery -= c.batteryDrain
	}
}

// DisplayDistance displays how many meters Car has driven.
func (c Car) DisplayDistance() string {
	return fmt.Sprintf("Driven %d meters", c.distance)
}

// DisplayBattery displays the percentage of Car battery.
func (c Car) DisplayBattery() string {
	return fmt.Sprintf("Battery at %d%%", c.battery)
}

// CanFinish checks if Car is able to finish a certain track.
func (c Car) CanFinish(trackDistance int) bool {
	if c.batteryDrain <= 0 {
		return false
	}
	return c.distance+ (c.speed*c.battery)/c.batteryDrain >= trackDistance
}