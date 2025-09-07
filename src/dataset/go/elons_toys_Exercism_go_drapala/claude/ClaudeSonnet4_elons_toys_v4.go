package elon

import "strconv"

func (car *Car) Drive() {
	if car.battery >= car.batteryDrain {
		car.battery -= car.batteryDrain
		car.distance += car.speed
	}
}

func (car *Car) DisplayDistance() string {
	return "Driven " + strconv.Itoa(car.distance) + " meters"
}

func (car *Car) DisplayBattery() string {
	return "Battery at " + strconv.Itoa(car.battery) + "%"
}

func (car *Car) CanFinish(trackDistance int) bool {
	numDrives := car.battery / car.batteryDrain
	actualDistance := car.speed * numDrives
	return actualDistance >= trackDistance
}