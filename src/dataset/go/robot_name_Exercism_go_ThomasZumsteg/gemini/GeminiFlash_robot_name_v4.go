package robotname

import (
	"fmt"
	"math/rand"
	"sync"
)

// Robot is just a name (for now)
type Robot string

// namesInUse keeps track of which names are in use
var (
	namesInUse = make(map[Robot]bool)
	mu         sync.Mutex
	rng        = rand.New(rand.NewSource(timeNow().UnixNano())) // Initialize a single random number generator
)

// timeNow is a variable to allow mocking in tests
var timeNow = time.Now

/*Name returns a robots name*/
func (r *Robot) Name() string {
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

	delete(namesInUse, *r)
	*r = Robot("")
}

/*letter generates a random upper case letter*/
func letter() string {
	return string(rng.Intn('Z'-'A'+1) + 'A')
}

/*number generates a random three digit number*/
func number() string {
	return fmt.Sprintf("%03d", rng.Intn(1000))
}