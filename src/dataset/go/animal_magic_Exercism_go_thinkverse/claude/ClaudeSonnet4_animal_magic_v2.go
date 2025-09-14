package chance

import (
	"math/rand"
	"sync"
	"time"
)

var (
	rng  *rand.Rand
	once sync.Once
)

func initRNG() {
	rng = rand.New(rand.NewSource(time.Now().UnixNano()))
}

// SeedWithTime seeds math/rand with the current computer time
func SeedWithTime() {
	once.Do(initRNG)
	rng.Seed(time.Now().UnixNano())
}

// RollADie returns a random int d with 1 <= d <= 20
func RollADie() int {
	once.Do(initRNG)
	return rng.Intn(20) + 1
}

// GenerateWandEnergy returns a random float64 f with 0.0 <= f < 12.0
func GenerateWandEnergy() float64 {
	once.Do(initRNG)
	return rng.Float64() * 12
}

// ShuffleAnimals returns a slice with all eight animal strings in random order
func ShuffleAnimals() []string {
	animals := []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
	
	once.Do(initRNG)
	rng.Shuffle(len(animals), func(i, j int) {
		animals[i], animals[j] = animals[j], animals[i]
	})

	return animals
}