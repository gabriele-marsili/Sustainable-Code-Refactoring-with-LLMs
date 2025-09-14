package pov

import (
	"fmt"
)

// Define the Graph type here.
type Graph struct {
	value    string
	children []*node
	nodeMap  map[string]*node // Cache for O(1) node lookup
}

type node struct {
	value    string
	children []*node
}

// Creates a new graph
func New() *Graph {
	return &Graph{
		children: make([]*node, 0),
		nodeMap:  make(map[string]*node),
	}
}

// Returns a node with the value
func NewNode(nodeLabel string) *node {
	return &node{
		value:    nodeLabel,
		children: make([]*node, 0),
	}
}

// Adds leaf nodes to the graph
func (g *Graph) AddNode(nodeLabel string) *node {
	new := NewNode(nodeLabel)
	g.children = append(g.children, new)
	g.nodeMap[nodeLabel] = new
	return new
}

// Finds if a node exists in the graph
func (g *Graph) FindNode(nodeLabel string) *node {
	return g.nodeMap[nodeLabel]
}

// Constructs tree from bottom up
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

// Returns a list of all arcs in the graph
func (g *Graph) ArcList() []string {
	var arcs []string
	for _, n := range g.children {
		for _, c := range n.children {
			arcs = append(arcs, fmt.Sprintf("%s -> %s", n.value, c.value))
		}
	}
	return arcs
}

// Find the Parent of a node
func (g *Graph) FindParent(child string, skip map[string]bool) *node {
	for _, n := range g.children {
		if skip[n.value] {
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

// Remove a child from a node
func (n *node) RemoveChild(child string) {
	for i, c := range n.children {
		if c.value == child {
			n.children = append(n.children[:i], n.children[i+1:]...)
			return
		}
	}
}

// Adds a child from a node
func (n *node) AddChild(child *node) {
	n.children = append(n.children, child)
}

// Change the root of the graph
func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	skip := make(map[string]bool)
	current := newRoot
	
	for {
		currentNode := g.FindNode(current)
		if currentNode.value == oldRoot {
			break
		}
		
		parent := g.FindParent(current, skip)
		if parent == nil {
			break
		}
		
		parent.RemoveChild(current)
		currentNode.AddChild(parent)
		skip[current] = true
		current = parent.value
	}
	return g
}