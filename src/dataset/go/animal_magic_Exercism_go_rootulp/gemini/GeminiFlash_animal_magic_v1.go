package chance

import (
	"math/rand"
	"time"
)

var (
	seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
	animals             = []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
)

// SeedWithTime seeds math/rand with the current computer time
func SeedWithTime() {
	seededRand = rand.New(rand.NewSource(time.Now().UnixNano()))
}

// RollADie returns a random int d with 1 <= d <= 20
func RollADie() int {
	return seededRand.Intn(20) + 1
}

// GenerateWandEnergy returns a random float64 f with 0.0 <= f < 12.0
func GenerateWandEnergy() float64 {
	return seededRand.Float64() * 12.0
}

// ShuffleAnimals returns a slice with all eight animal strings in random order
func ShuffleAnimals() []string {
	n := len(animals)
	shuffled := make([]string, n)
	perm := seededRand.Perm(n)
	for i, v := range perm {
		shuffled[i] = animals[v]
	}
	return shuffled
}