package pov

import (
	"fmt"
)

type Graph struct {
	value    string
	children []*node
	nodeMap  map[string]*node
}

type node struct {
	value    string
	children []*node
}

func New() *Graph {
	return &Graph{
		children: make([]*node, 0),
		nodeMap:  make(map[string]*node),
	}
}

func NewNode(nodeLabel string) *node {
	return &node{
		value:    nodeLabel,
		children: make([]*node, 0),
	}
}

func (g *Graph) AddNode(nodeLabel string) *node {
	if existing, exists := g.nodeMap[nodeLabel]; exists {
		return existing
	}
	
	new := NewNode(nodeLabel)
	g.children = append(g.children, new)
	g.nodeMap[nodeLabel] = new
	return new
}

func (g *Graph) FindNode(nodeLabel string) *node {
	return g.nodeMap[nodeLabel]
}

func (g *Graph) AddArc(from, to string) {
	fromNode := g.FindNode(from)
	if fromNode == nil {
		fromNode = g.AddNode(from)
	}
	
	toNode := g.FindNode(to)
	if toNode != nil {
		fromNode.children = append(fromNode.children, toNode)
	}
}

func (g *Graph) ArcList() []string {
	var arcs []string
	for _, n := range g.children {
		for _, c := range n.children {
			arcs = append(arcs, fmt.Sprintf("%s -> %s", n.value, c.value))
		}
	}
	return arcs
}

func (g *Graph) FindParent(child string, skipMap map[string]bool) *node {
	for _, n := range g.children {
		if skipMap[n.value] {
			continue
		}
		for _, c := range n.children {
			if c.value == child {
				return n
			}
		}
	}
	return nil
}

func (n *node) RemoveChild(child string) {
	for i, c := range n.children {
		if c.value == child {
			n.children = append(n.children[:i], n.children[i+1:]...)
			return
		}
	}
}

func (n *node) AddChild(child *node) {
	n.children = append(n.children, child)
}

func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	skipMap := make(map[string]bool)
	current := newRoot
	
	for g.FindNode(current).value != oldRoot {
		currentNode := g.FindNode(current)
		parent := g.FindParent(currentNode.value, skipMap)
		parent.RemoveChild(currentNode.value)
		currentNode.AddChild(parent)
		skipMap[current] = true
		current = parent.value
	}
	return g
}