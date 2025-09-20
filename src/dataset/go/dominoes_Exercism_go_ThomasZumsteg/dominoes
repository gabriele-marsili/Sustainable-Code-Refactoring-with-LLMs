package dominoes

type queueItem struct {
	pool  []Domino
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

	initial := queueItem{dominoes[1:], []Domino{dominoes[0]}}
	queue := []queueItem{initial}

	for len(queue) > 0 {
		item := queue[len(queue)-1]
		queue = queue[:len(queue)-1]

		if len(item.pool) == 0 {
			if item.chain[0][0] == item.Tail() {
				return item.chain, true
			}
			continue
		}

		for i, d := range item.pool {
			remaining := append(item.pool[:i], item.pool[i+1:]...)
			if d[0] != item.Tail() {
				d = Domino{d[1], d[0]}
			}
			if d[0] == item.Tail() {
				queue = append(queue, queueItem{
					remaining,
					append(item.chain, d),
				})
			}
		}
	}
	return nil, false
}