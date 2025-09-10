package chance

import (
	"math/rand"
	"time"
)

var globalRand *rand.Rand

func init() {
	source := rand.NewSource(time.Now().UnixNano())
	globalRand = rand.New(source)
}

// SeedWithTime seeds math/rand with the current computer time
func SeedWithTime() {
	source := rand.NewSource(time.Now().UnixNano())
	globalRand = rand.New(source)
}

// RollADie returns a random int d with 1 <= d <= 20
func RollADie() int {
	return globalRand.Intn(20) + 1
}

// GenerateWandEnergy returns a random float64 f with 0.0 <= f < 12.0
func GenerateWandEnergy() float64 {
	return globalRand.Float64() * 12.0
}

// ShuffleAnimals returns a slice with all eight animal strings in random order
func ShuffleAnimals() []string {
	animals := []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
	n := len(animals)
	shuffled := make([]string, n)
	perm := globalRand.Perm(n)
	for i := 0; i < n; i++ {
		shuffled[i] = animals[perm[i]]
	}
	return shuffled
}