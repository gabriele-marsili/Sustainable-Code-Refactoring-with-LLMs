package robotname

import (
	"errors"
	"fmt"
	"sync"
)

var (
	nameCache = make(map[string]bool)
	mu        sync.Mutex
	counter   int
	maxRobots = 26 * 26 * 1000
)

type Robot struct {
	name string
}

func (r *Robot) Name() (string, error) {
	if r.name != "" {
		return r.name, nil
	}

	if counter >= maxRobots {
		return "", errors.New("no more names available")
	}

	mu.Lock()
	defer mu.Unlock()

	for {
		if counter >= maxRobots {
			return "", errors.New("no more names available")
		}
		name := generateName(counter)
		counter++

		if !nameCache[name] {
			nameCache[name] = true
			r.name = name
			return name, nil
		}
	}
}

func (r *Robot) Reset() {
	mu.Lock()
	defer mu.Unlock()

	if r.name != "" {
		delete(nameCache, r.name)
		r.name = ""
		counter = 0
		for k := range nameCache {
			delete(nameCache, k)
		}
	}
}

func generateName(n int) string {
	letter1 := rune('A' + (n / 1000) / 26)
	letter2 := rune('A' + (n / 1000) % 26)
	number := n % 1000
	return fmt.Sprintf("%c%c%03d", letter1, letter2, number)
}