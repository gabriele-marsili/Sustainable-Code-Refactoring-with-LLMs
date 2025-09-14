package pov

import (
	"fmt"
)

// Define the Graph type here.
type Graph struct {
	value    string
	children []*node
	nodeMap  map[string]*node
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
// to: a node that has already been added
// from: a node to add
func (g *Graph) AddArc(from, to string) {
	fromNode := g.FindNode(from)
	if fromNode == nil {
		fromNode = g.AddNode(from)
	}
	toNode := g.FindNode(to)
	fromNode.children = append(fromNode.children, toNode)
}

// Dump method
// Returns a list of all arcs in the graph
// from -> to
// Test program will sort the list (we don't need to)
func (g *Graph) ArcList() []string {
	arcs := make([]string, 0)
	for _, n := range g.children {
		for _, c := range n.children {
			arcs = append(arcs, fmt.Sprintf("%s -> %s", n.value, c.value))
		}
	}
	return arcs
}

// Find the Parent of a node
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
// We will change g in place
func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	skipMap := make(map[string]bool)
	current := newRoot
	
	for g.FindNode(current).value != oldRoot {
		current_node := g.FindNode(current)
		parent := g.FindParent(current_node.value, skipMap)
		parent.RemoveChild(current_node.value)
		current_node.AddChild(parent)
		skipMap[current] = true
		current = parent.value
	}
	return g
}