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

func SeedWithTime() {
	once.Do(initRNG)
	rng.Seed(time.Now().UnixNano())
}

func RollADie() int {
	once.Do(initRNG)
	return rng.Intn(20) + 1
}

func GenerateWandEnergy() float64 {
	once.Do(initRNG)
	return rng.Float64() * 12
}

func ShuffleAnimals() []string {
	animals := []string{"ant", "beaver", "cat", "dog", "elephant", "fox", "giraffe", "hedgehog"}
	
	once.Do(initRNG)
	rng.Shuffle(len(animals), func(i, j int) {
		animals[i], animals[j] = animals[j], animals[i]
	})

	return animals
}