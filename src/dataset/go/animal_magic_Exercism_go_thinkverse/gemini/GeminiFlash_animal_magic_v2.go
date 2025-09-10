package chance

import (
	"math/rand"
	"time"
)

var seededRand *rand.Rand

func init() {
	seed := time.Now().UnixNano()
	source := rand.NewSource(seed)
	seededRand = rand.New(source)
}

// SeedWithTime seeds math/rand with the current computer time
func SeedWithTime() {
	newSeed := time.Now().UnixNano()
	seededRand.Seed(newSeed)
}

// RollADie returns a random int d with 1 <= d <= 20
func RollADie() int {
	return seededRand.Intn(20) + 1
}

// GenerateWandEnergy returns a random float64 f with 0.0 <= f < 12.0
func GenerateWandEnergy() float64 {
	return seededRand.Float64() * 12
}

// ShuffleAnimals returns a slice with all eight animal strings in random order
func ShuffleAnimals() []string {
	animals := []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}

	shuffledAnimals := make([]string, len(animals))
	copy(shuffledAnimals, animals)

	seededRand.Shuffle(len(shuffledAnimals), func(i, j int) {
		shuffledAnimals[i], shuffledAnimals[j] = shuffledAnimals[j], shuffledAnimals[i]
	})

	return shuffledAnimals
}