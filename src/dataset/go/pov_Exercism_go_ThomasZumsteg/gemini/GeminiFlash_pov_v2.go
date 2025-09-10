package pov

//TestVersion is the unit tests that this will pass
const TestVersion = 1

//Graph is a directed graph of string nodes
type Graph map[string][]string

/*New creates an empty graph.*/
func New() *Graph {
	g := make(Graph)
	return &g
}

/*AddNode adds a node to the graph.*/
func (g *Graph) AddNode(nodeLabel string) {
	if _, ok := (*g)[nodeLabel]; !ok {
		(*g)[nodeLabel] = make([]string, 0)
	}
}

/*AddArc adds and edge to the graph*/
func (g *Graph) AddArc(from, to string) {
	if g == nil {
		return
	}
	children := (*g)[from]
	for _, child := range children {
		if child == to {
			return // Avoid duplicate edges
		}
	}
	(*g)[from] = append(children, to)
}

/*ArcList shows all edges in the graph*/
func (g *Graph) ArcList() []string {
	var edges []string
	for from, children := range *g {
		for _, to := range children {
			edges = append(edges, from+" -> "+to)
		}
	}
	return edges
}

/*ChangeRoot reroots the graph.*/
func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	if oldRoot == newRoot {
		return g
	}

	path := g.getPath(oldRoot, newRoot)

	if path == nil {
		return g // No path, no change
	}

	for i := 0; i < len(path)-1; i++ {
		oldTo, oldFrom := path[i], path[i+1]
		g.removeArc(oldFrom, oldTo)
		g.AddArc(oldTo, oldFrom)
	}
	return g
}

/*removeArc removes an edge from the graph.*/
func (g *Graph) removeArc(from, to string) {
	children := (*g)[from]
	if len(children) == 0 {
		return
	}

	newChildren := make([]string, 0, len(children))
	removed := false
	for _, child := range children {
		if child != to {
			newChildren = append(newChildren, child)
		} else {
			removed = true
		}
	}

	if removed {
		(*g)[from] = newChildren
	}
}

/*getPath finds the list from one node to another.*/
func (g *Graph) getPath(from, to string) []string {
	visited := make(map[string]bool)
	return g.getPathRecursive(from, to, visited)
}

func (g *Graph) getPathRecursive(from, to string, visited map[string]bool) []string {
	if visited[from] {
		return nil
	}
	visited[from] = true

	if from == to {
		return []string{to}
	}

	for _, child := range (*g)[from] {
		path := g.getPathRecursive(child, to, visited)
		if path != nil {
			return append(path, from)
		}
	}

	return nil
}