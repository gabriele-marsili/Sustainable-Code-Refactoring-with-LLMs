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
	n := len(dominoes)
	if n == 0 {
		return []Domino{}, true
	}

	for start := 0; start < n; start++ {
		queue := []queueItem{{pool: append([]Domino{}, dominoes[:start]...), seen: []Domino{}, chain: []Domino{dominoes[start]}}}
		if start+1 < n {
			queue[0].pool = append(queue[0].pool, dominoes[start+1:]...)
		}

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

				if d[0] != item.Tail() {
					d = Domino{d[1], d[0]}
				}

				if d[0] == item.Tail() {
					newChain := make([]Domino, len(item.chain), len(item.chain)+1)
					copy(newChain, item.chain)
					newChain = append(newChain, d)

					newQueueItem := queueItem{
						pool:  append(newPool, item.seen...),
						seen:  []Domino{},
						chain: newChain,
					}
					queue = append(queue, newQueueItem)
				}

				newSeen := make([]Domino, len(item.seen), len(item.seen)+1)
				copy(newSeen, item.seen)
				newSeen = append(newSeen, d)

				queue = append(queue, queueItem{pool: newPool, seen: newSeen, chain: item.chain})
			}
		}
	}

	return nil, false
}