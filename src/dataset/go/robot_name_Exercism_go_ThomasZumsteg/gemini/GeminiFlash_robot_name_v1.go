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
	rng        *rand.Rand
)

func init() {
	source := rand.NewSource(time.Now().UnixNano())
	rng = rand.New(source)
}

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