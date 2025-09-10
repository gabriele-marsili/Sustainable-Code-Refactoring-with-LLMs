package pov

import (
	"fmt"
)

// Define the Graph type here.
type Graph struct {
	nodes map[string]*node
}

type node struct {
	value    string
	children []*node
}

// Creates a new graph
func New() *Graph {
	g := &Graph{
		nodes: make(map[string]*node),
	}
	return g
}

// Returns a node with the value
func NewNode(nodeLabel string) *node {
	n := &node{
		value:    nodeLabel,
		children: make([]*node, 0),
	}
	return n
}

// Adds leaf nodes to the graph
func (g *Graph) AddNode(nodeLabel string) *node {
	if _, ok := g.nodes[nodeLabel]; ok {
		return g.nodes[nodeLabel]
	}
	newNode := NewNode(nodeLabel)
	g.nodes[nodeLabel] = newNode
	return newNode
}

// Finds if a node exists in the graph
func (g *Graph) FindNode(nodeLabel string) *node {
	return g.nodes[nodeLabel]
}

// Adds an arc from one node to another.  Creates the nodes if they don't exist.
func (g *Graph) AddArc(from, to string) {
	fromNode := g.AddNode(from)
	toNode := g.AddNode(to)
	fromNode.AddChild(toNode)
}

// Dump method
// Returns a list of all arcs in the graph
// from -> to
// Test program will sort the list (we don't need to)
func (g *Graph) ArcList() []string {
	arcs := make([]string, 0)
	for _, n := range g.nodes {
		for _, c := range n.children {
			arcs = append(arcs, fmt.Sprintf("%s -> %s", n.value, c.value))
		}
	}
	return arcs
}

// Find if value is in slice
func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

// Find the Parent of a node
func (g *Graph) FindParent(child string, skip []string) *node {
	for _, n := range g.nodes {
		for _, c := range n.children {
			if c.value == child && !contains(skip, n.value) {
				return n
			}
		}
	}
	return nil
}

// Remove a child from a node
func (n *node) RemoveChild(child string) {
	for i := 0; i < len(n.children); i++ {
		if n.children[i].value == child {
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
	stack := make([]string, 0)
	current := newRoot

	for current != oldRoot {
		currentNode := g.FindNode(current)
		parent := g.FindParent(currentNode.value, stack)

		if parent == nil {
			break // Handle case where oldRoot is not reachable from newRoot
		}

		parent.RemoveChild(currentNode.value)
		currentNode.AddChild(parent)
		stack = append(stack, current)
		current = parent.value
	}

	return g
}