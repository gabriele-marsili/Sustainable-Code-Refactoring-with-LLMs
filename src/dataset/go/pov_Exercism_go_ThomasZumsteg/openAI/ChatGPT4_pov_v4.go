package pov

const TestVersion = 1

type Graph map[string]map[string]struct{}

func New() *Graph {
	return &Graph{}
}

func (g *Graph) AddNode(nodeLabel string) {
	if _, exists := (*g)[nodeLabel]; !exists {
		(*g)[nodeLabel] = make(map[string]struct{})
	}
}

func (g *Graph) AddArc(from, to string) {
	if _, exists := (*g)[from]; !exists {
		(*g)[from] = make(map[string]struct{})
	}
	(*g)[from][to] = struct{}{}
}

func (g *Graph) ArcList() []string {
	edges := make([]string, 0, len(*g))
	for from, children := range *g {
		for to := range children {
			edges = append(edges, from+" -> "+to)
		}
	}
	return edges
}

func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	path := g.getPath(oldRoot, newRoot)
	for i := 0; i < len(path)-1; i++ {
		oldTo, oldFrom := path[i], path[i+1]
		g.removeArc(oldFrom, oldTo)
		g.AddArc(oldTo, oldFrom)
	}
	return g
}

func (g *Graph) removeArc(from, to string) {
	if children, exists := (*g)[from]; exists {
		delete(children, to)
	}
}

func (g *Graph) getPath(from, to string) []string {
	visited := make(map[string]struct{})
	var dfs func(string) []string
	dfs = func(current string) []string {
		if current == to {
			return []string{to}
		}
		visited[current] = struct{}{}
		for child := range (*g)[current] {
			if _, seen := visited[child]; !seen {
				if path := dfs(child); path != nil {
					return append(path, current)
				}
			}
		}
		return nil
	}
	return dfs(from)
}