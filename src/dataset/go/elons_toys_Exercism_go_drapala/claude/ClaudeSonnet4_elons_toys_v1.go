package elon

import "strconv"

// Drive the car
func (car *Car) Drive() {
	// If car has enough battery for one more drive
	if car.battery >= car.batteryDrain {
		car.battery -= car.batteryDrain
		car.distance += car.speed
	}
}

// Display distance
func (car *Car) DisplayDistance() string {
	return "Driven " + strconv.Itoa(car.distance) + " meters"
}

// Display battery
func (car *Car) DisplayBattery() string {
	return "Battery at " + strconv.Itoa(car.battery) + "%"
}

// TODO: define the 'CanFinish(trackDistance int) bool' method
func (car *Car) CanFinish(trackDistance int) bool {
	numDrives := car.battery / car.batteryDrain
	actualDistance := car.speed * numDrives
	return actualDistance >= trackDistance
}