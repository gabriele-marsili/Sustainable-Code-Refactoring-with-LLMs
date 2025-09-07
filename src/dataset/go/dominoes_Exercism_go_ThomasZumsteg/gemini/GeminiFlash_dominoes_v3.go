package dominoes

type queueItem struct {
	pool  []Domino
	seen  []Domino
	chain []Domino
}

func (i *queueItem) Tail() int {
	return i.chain[len(i.chain)-1][1]
}

type Domino = [2]int

func MakeChain(dominoes []Domino) ([]Domino, bool) {
	if len(dominoes) == 0 {
		return []Domino{}, true
	}

	first := dominoes[0]
	remaining := dominoes[1:]

	queue := []queueItem{{pool: remaining, chain: []Domino{first}}}

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		if len(item.pool) == 0 {
			if len(item.seen) == 0 && item.chain[0][0] == item.Tail() {
				return item.chain, true
			}
			continue
		}

		for i := 0; i < len(item.pool); i++ {
			d := item.pool[i]
			newPool := make([]Domino, 0, len(item.pool)-1)
			newPool = append(newPool, item.pool[:i]...)
			newPool = append(newPool, item.pool[i+1:]...)

			if d[0] == item.Tail() {
				newChain := make([]Domino, len(item.chain), len(item.chain)+1)
				copy(newChain, item.chain)
				newChain = append(newChain, d)
				queue = append(queue, queueItem{pool: append(newPool, item.seen...), chain: newChain})
			} else if d[1] == item.Tail() {
				d = Domino{d[1], d[0]}
				newChain := make([]Domino, len(item.chain), len(item.chain)+1)
				copy(newChain, item.chain)
				newChain = append(newChain, d)
				queue = append(queue, queueItem{pool: append(newPool, item.seen...), chain: newChain})
			} else {
				newSeen := make([]Domino, len(item.seen), len(item.seen)+1)
				copy(newSeen, item.seen)
				newSeen = append(newSeen, d)
				queue = append(queue, queueItem{pool: newPool, seen: newSeen, chain: item.chain})
			}
		}
	}

	return nil, false
}