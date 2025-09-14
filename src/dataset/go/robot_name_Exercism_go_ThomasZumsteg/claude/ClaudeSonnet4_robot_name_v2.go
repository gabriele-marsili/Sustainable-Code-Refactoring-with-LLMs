package robotname

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

//Robot is just a name (for now)
type Robot string

//namesInUse keeps track of which names are in use
var (
	namesInUse = make(map[Robot]bool)
	rng        = rand.New(rand.NewSource(time.Now().UnixNano()))
	mu         sync.Mutex
)

/*Name returns a robots name*/
func (r *Robot) Name() string {
	if *r != "" {
		return string(*r)
	}
	
	mu.Lock()
	defer mu.Unlock()
	
	for {
		name := Robot(letter() + letter() + number())
		if !namesInUse[name] {
			*r = name
			namesInUse[name] = true
			break
		}
	}
	return string(*r)
}

/*Reset give a robot a new name*/
func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()
	
	if *r != "" {
		delete(namesInUse, *r)
		*r = Robot("")
	}
}

/*letter generates a random upper case letter*/
func letter() string {
	return string(rng.Intn(26) + 'A')
}

/*number generates a random three digit number*/
func number() string {
	return fmt.Sprintf("%03d", rng.Intn(1000))
}