package robotname

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// Robot is just a name (for now)
type Robot string

// namesInUse keeps track of which names are in use
var (
	namesInUse = make(map[Robot]bool)
	mu         sync.Mutex
	seeded     bool
)

// seedRand seeds the random number generator if it hasn't been seeded yet.
func seedRand() {
	mu.Lock()
	defer mu.Unlock()
	if !seeded {
		rand.Seed(time.Now().UnixNano())
		seeded = true
	}
}

/*Name returns a robots name*/
func (r *Robot) Name() string {
	seedRand()

	mu.Lock()
	defer mu.Unlock()

	if string(*r) != "" {
		return string(*r)
	}

	for {
		newName := Robot(letter() + letter() + number())
		if !namesInUse[newName] {
			*r = newName
			namesInUse[*r] = true
			return string(*r)
		}
	}
}

/*Reset give a robot a new name*/
func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	_, ok := namesInUse[*r]
	if ok {
		delete(namesInUse, *r)
	}
	*r = ""
}

/*letter generates a random upper case letter*/
func letter() string {
	return string(rand.Intn('Z'-'A'+1) + 'A')
}

/*number generates a random three digit number*/
func number() string {
	return fmt.Sprintf("%03d", rand.Intn(1000))
}