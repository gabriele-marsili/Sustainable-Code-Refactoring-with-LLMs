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
	for from, v := range *g {
		for _, to := range v {
			edges = append(edges, from+" -> "+to)
		}
	}
	return edges
}

func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	path := g.getPath(oldRoot, newRoot)
	if path == nil {
		return g
	}
	for i := len(path) - 1; i > 0; i-- {
		oldTo, oldFrom := path[i], path[i-1]
		g.removeArc(oldFrom, oldTo)
		g.AddArc(oldTo, oldFrom)
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
	visited := make(map[string]bool)
	var dfs func(string) []string
	dfs = func(current string) []string {
		if current == to {
			return []string{to}
		}
		visited[current] = true
		for _, child := range (*g)[current] {
			if !visited[child] {
				if path := dfs(child); path != nil {
					return append(path, current)
				}
			}
		}
		return nil
	}
	return dfs(from)
}