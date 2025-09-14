package chance

import (
	"math/rand"
	"time"
)

var rng = rand.New(rand.NewSource(time.Now().UnixNano()))

// SeedWithTime seeds math/rand with the current computer time
func SeedWithTime() {
	rng.Seed(time.Now().UnixNano())
}

// RollADie returns a random int d with 1 <= d <= 20
func RollADie() int {
	return rng.Intn(20) + 1
}

// GenerateWandEnergy returns a random float64 f with 0.0 <= f < 12.0
func GenerateWandEnergy() float64 {
	return rng.Float64() * 12.0
}

// ShuffleAnimals returns a slice with all eight animal strings in random order
func ShuffleAnimals() (shuffled []string) {
	animals := []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
	
	shuffled = make([]string, len(animals))
	perm := rng.Perm(len(animals))
	for i, v := range perm {
		shuffled[i] = animals[v]
	}
	return shuffled
}