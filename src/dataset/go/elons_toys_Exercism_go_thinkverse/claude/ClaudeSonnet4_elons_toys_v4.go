package elon

import "strconv"

// Drive drives the Car one time, if there is not enough
// battery to drive on more time, the car will not move
func (c *Car) Drive() {
	if c.battery >= c.batteryDrain {
		c.battery -= c.batteryDrain
		c.distance += c.speed
	}
}

// DisplayDistance displays how many meters Car has driven.
func (c Car) DisplayDistance() string {
	return "Driven " + strconv.Itoa(c.distance) + " meters"
}

// DisplayBattery displays the percentage of Car battery.
func (c Car) DisplayBattery() string {
	return "Battery at " + strconv.Itoa(c.battery) + "%"
}

// CanFinish checks if Car is able to finish a certain track.
func (c Car) CanFinish(trackDistance int) bool {
	if c.batteryDrain == 0 {
		return false
	}
	return (c.speed*c.battery)/c.batteryDrain >= trackDistance
}