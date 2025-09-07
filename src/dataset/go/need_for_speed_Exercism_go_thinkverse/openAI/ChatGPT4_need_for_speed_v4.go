package speed

type Car struct {
	battery      int
	batteryDrain int
	speed        int
	distance     int
}

type Track struct {
	distance int
}

func NewCar(speed, batteryDrain int) Car {
	return Car{100, batteryDrain, speed, 0}
}

func NewTrack(distance int) Track {
	return Track{distance}
}

func Drive(car Car) Car {
	if car.battery > car.batteryDrain {
		car.battery -= car.batteryDrain
		car.distance += car.speed
	}
	return car
}

func CanFinish(car Car, track Track) bool {
	return car.battery/car.batteryDrain*car.speed >= track.distance
}