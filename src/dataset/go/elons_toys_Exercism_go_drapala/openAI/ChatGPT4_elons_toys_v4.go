package elon

import "fmt"

// Drive the car
func (car *Car) Drive() {
	if car.battery >= car.batteryDrain {
		car.battery -= car.batteryDrain
		car.distance += car.speed
	}
}

// Display distance
func (car *Car) DisplayDistance() string {
	return fmt.Sprintf("Driven %d meters", car.distance)
}

// Display battery
func (car *Car) DisplayBattery() string {
	return fmt.Sprintf("Battery at %d%%", car.battery)
}

// Check if the car can finish the track
func (car *Car) CanFinish(trackDistance int) bool {
	return car.speed*(car.battery/car.batteryDrain) >= trackDistance
}