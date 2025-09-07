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
	return Car{
		battery:      100,
		batteryDrain: batteryDrain,
		speed:        speed,
		distance:     0,
	}
}

func NewTrack(distance int) Track {
	return Track{distance}
}

func Drive(car Car) Car {
	if car.battery < car.batteryDrain {
		return car
	}

	car.battery -= car.batteryDrain
	car.distance += car.speed

	return car
}

func CanFinish(car Car, track Track) bool {
	if car.batteryDrain == 0 {
		return false
	}
	maxDistance := (car.battery / car.batteryDrain) * car.speed
	return maxDistance >= track.distance
}