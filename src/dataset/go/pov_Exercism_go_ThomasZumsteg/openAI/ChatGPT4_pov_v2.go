package pov

// TestVersion is the unit tests that this will pass
const TestVersion = 1

// Graph is a directed graph of string nodes
type Graph map[string]map[string]struct{}

// New creates an empty graph.
func New() *Graph {
	return &Graph{}
}

// AddNode adds a node to the graph.
func (g *Graph) AddNode(nodeLabel string) {
	if _, exists := (*g)[nodeLabel]; !exists {
		(*g)[nodeLabel] = make(map[string]struct{})
	}
}

// AddArc adds an edge to the graph.
func (g *Graph) AddArc(from, to string) {
	if _, exists := (*g)[from]; !exists {
		g.AddNode(from)
	}
	if _, exists := (*g)[to]; !exists {
		g.AddNode(to)
	}
	(*g)[from][to] = struct{}{}
}

// ArcList shows all edges in the graph.
func (g *Graph) ArcList() []string {
	edges := make([]string, 0)
	for from, children := range *g {
		for to := range children {
			edges = append(edges, from+" -> "+to)
		}
	}
	return edges
}

// ChangeRoot reroots the graph.
func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	path := g.getPath(oldRoot, newRoot)
	for i := 0; i < len(path)-1; i++ {
		oldTo, oldFrom := path[i], path[i+1]
		g.removeArc(oldFrom, oldTo)
		g.AddArc(oldTo, oldFrom)
	}
	return g
}

// removeArc removes an edge from the graph.
func (g *Graph) removeArc(from, to string) {
	if children, exists := (*g)[from]; exists {
		delete(children, to)
	}
}

// getPath finds the list from one node to another.
func (g *Graph) getPath(from, to string) []string {
	// Iterative depth-first search to avoid recursion overhead
	stack := []string{from}
	visited := make(map[string]bool)
	parent := make(map[string]string)

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if current == to {
			var path []string
			for node := to; node != ""; node = parent[node] {
				path = append(path, node)
			}
			return reverse(path)
		}

		if visited[current] {
			continue
		}
		visited[current] = true

		for child := range (*g)[current] {
			if !visited[child] {
				stack = append(stack, child)
				parent[child] = current
			}
		}
	}
	return nil
}

// reverse reverses a slice of strings.
func reverse(s []string) []string {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
	return s
}