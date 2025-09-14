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
	if _, exists := (*g)[nodeLabel]; !exists {
		(*g)[nodeLabel] = make([]string, 0)
	}
}

/*AddArc adds and edge to the graph*/
func (g *Graph) AddArc(from, to string) {
	(*g)[from] = append((*g)[from], to)
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
	path := g.getPath(oldRoot, newRoot)
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
	for i, child := range children {
		if child == to {
			(*g)[from] = append(children[:i], children[i+1:]...)
			return
		}
	}
}

/*getPath finds the list from one node to another.*/
func (g *Graph) getPath(from, to string) []string {
	visited := make(map[string]bool)
	return g.dfs(from, to, visited)
}

func (g *Graph) dfs(from, to string, visited map[string]bool) []string {
	if from == to {
		return []string{to}
	}
	
	if visited[from] {
		return nil
	}
	visited[from] = true
	
	for _, child := range (*g)[from] {
		if path := g.dfs(child, to, visited); path != nil {
			return append(path, from)
		}
	}
	
	visited[from] = false
	return nil
}