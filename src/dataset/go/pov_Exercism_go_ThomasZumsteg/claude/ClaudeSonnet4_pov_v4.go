package pov

const TestVersion = 1

type Graph map[string][]string

func New() *Graph {
	g := make(Graph)
	return &g
}

func (g *Graph) AddNode(nodeLabel string) {
	if _, exists := (*g)[nodeLabel]; !exists {
		(*g)[nodeLabel] = make([]string, 0, 4)
	}
}

func (g *Graph) AddArc(from, to string) {
	(*g)[from] = append((*g)[from], to)
}

func (g *Graph) ArcList() []string {
	if len(*g) == 0 {
		return nil
	}
	
	totalEdges := 0
	for _, children := range *g {
		totalEdges += len(children)
	}
	
	edges := make([]string, 0, totalEdges)
	for from, children := range *g {
		for _, to := range children {
			edges = append(edges, from+" -> "+to)
		}
	}
	return edges
}

func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	path := g.getPath(oldRoot, newRoot)
	if len(path) < 2 {
		return g
	}
	
	for i := 0; i < len(path)-1; i++ {
		oldTo, oldFrom := path[i], path[i+1]
		g.removeArc(oldFrom, oldTo)
		g.AddArc(oldTo, oldFrom)
	}
	return g
}

func (g *Graph) removeArc(from, to string) {
	children := (*g)[from]
	if len(children) == 0 {
		return
	}
	
	for i, child := range children {
		if child == to {
			(*g)[from] = append(children[:i], children[i+1:]...)
			return
		}
	}
}

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
	
	delete(visited, from)
	return nil
}