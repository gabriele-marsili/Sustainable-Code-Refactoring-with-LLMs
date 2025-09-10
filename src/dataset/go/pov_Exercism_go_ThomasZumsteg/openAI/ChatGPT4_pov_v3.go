package pov

const TestVersion = 1

type Graph map[string][]string

func New() *Graph {
	return &Graph{}
}

func (g *Graph) AddNode(nodeLabel string) {
	if _, exists := (*g)[nodeLabel]; !exists {
		(*g)[nodeLabel] = nil
	}
}

func (g *Graph) AddArc(from, to string) {
	(*g)[from] = append((*g)[from], to)
}

func (g *Graph) ArcList() []string {
	edges := make([]string, 0, len(*g)*2)
	for from, children := range *g {
		for _, to := range children {
			edges = append(edges, from+" -> "+to)
		}
	}
	return edges
}

func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	path := g.getPath(oldRoot, newRoot)
	for i := len(path) - 1; i > 0; i-- {
		g.removeArc(path[i], path[i-1])
		g.AddArc(path[i-1], path[i])
	}
	return g
}

func (g *Graph) removeArc(from, to string) {
	children := (*g)[from]
	for i, child := range children {
		if child == to {
			(*g)[from] = append(children[:i], children[i+1:]...)
			return
		}
	}
}

func (g *Graph) getPath(from, to string) []string {
	stack := []string{from}
	visited := make(map[string]bool)
	parent := make(map[string]string)

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node == to {
			path := []string{to}
			for p := to; p != from; p = parent[p] {
				path = append(path, parent[p])
			}
			return path
		}

		if visited[node] {
			continue
		}
		visited[node] = true

		for _, child := range (*g)[node] {
			if !visited[child] {
				parent[child] = node
				stack = append(stack, child)
			}
		}
	}
	return nil
}