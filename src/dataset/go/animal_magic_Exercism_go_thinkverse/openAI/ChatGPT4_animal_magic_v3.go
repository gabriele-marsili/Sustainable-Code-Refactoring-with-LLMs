package chance

import (
	"math/rand"
	"sync"
	"time"
)

var (
	rng   = rand.New(rand.NewSource(time.Now().UnixNano()))
	rngMu sync.Mutex
)

// SeedWithTime seeds the shared rand instance with the current computer time
func SeedWithTime() {
	rngMu.Lock()
	defer rngMu.Unlock()
	rng.Seed(time.Now().UnixNano())
}

// RollADie returns a random int d with 1 <= d <= 20
func RollADie() int {
	rngMu.Lock()
	defer rngMu.Unlock()
	return rng.Intn(20) + 1
}

// GenerateWandEnergy returns a random float64 f with 0.0 <= f < 12.0
func GenerateWandEnergy() float64 {
	rngMu.Lock()
	defer rngMu.Unlock()
	return rng.Float64() * 12
}

// ShuffleAnimals returns a slice with all eight animal strings in random order
func ShuffleAnimals() []string {
	animals := []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
	rngMu.Lock()
	defer rngMu.Unlock()
	rng.Shuffle(len(animals), func(i, j int) {
		animals[i], animals[j] = animals[j], animals[i]
	})
	return animals
}