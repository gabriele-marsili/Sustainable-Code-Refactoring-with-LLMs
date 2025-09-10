package robotname

import (
	"errors"
	"math/rand"
	"sync"
	"time"
)

type Robot struct {
	name string
}

const maxNumberOfNames = 26 * 26 * 10 * 10 * 10

var (
	robotNames = make(map[string]bool)
	nameMutex  sync.Mutex
	rng        = rand.New(rand.NewSource(time.Now().UnixNano()))
)

func (r *Robot) Name() (string, error) {
	if r.name != "" {
		return r.name, nil
	}

	nameMutex.Lock()
	defer nameMutex.Unlock()

	if len(robotNames) == maxNumberOfNames {
		return "", errors.New("namespace exhausted")
	}

	for {
		name := generateName()
		if !robotNames[name] {
			robotNames[name] = true
			r.name = name
			return r.name, nil
		}
	}
}

func (r *Robot) Reset() {
	nameMutex.Lock()
	defer nameMutex.Unlock()

	if r.name != "" {
		delete(robotNames, r.name)
	}
	r.name = "" // Invalidate the current name so a new one is generated
}

func generateName() string {
	letters := [2]rune{
		rune('A' + rng.Intn(26)),
		rune('A' + rng.Intn(26)),
	}
	numbers := [3]int{
		rng.Intn(10),
		rng.Intn(10),
		rng.Intn(10),
	}

	return string(letters[0]) + string(letters[1]) +
		string(numbers[0]+'0') + string(numbers[1]+'0') + string(numbers[2]+'0')
}