package chance

import (
	"math/rand"
	"time"
)

var (
	rng     = rand.New(rand.NewSource(time.Now().UnixNano()))
	animals = [8]string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
)

func SeedWithTime() {
	rng.Seed(time.Now().UnixNano())
}

func RollADie() int {
	return rng.Intn(20) + 1
}

func GenerateWandEnergy() float64 {
	return rng.Float64() * 12.0
}

func ShuffleAnimals() []string {
	shuffled := make([]string, 8)
	perm := rng.Perm(8)
	for i, v := range perm {
		shuffled[i] = animals[v]
	}
	return shuffled
}