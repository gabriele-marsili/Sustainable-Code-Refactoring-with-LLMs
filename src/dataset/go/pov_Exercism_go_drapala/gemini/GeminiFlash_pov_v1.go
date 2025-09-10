package pov

import (
	"fmt"
)

// Define the Graph type here.
type Graph struct {
	value    string
	children []*node
	nodeMap  map[string]*node // Add a map for faster node lookup
}

type node struct {
	value    string
	children []*node
}

// Creates a new graph
func New() *Graph {
	g := &Graph{
		children: make([]*node, 0),
		nodeMap:  make(map[string]*node), // Initialize the map
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
	if _, ok := g.nodeMap[nodeLabel]; ok {
		return g.nodeMap[nodeLabel]
	}
	newNode := NewNode(nodeLabel)
	g.children = append(g.children, newNode)
	g.nodeMap[nodeLabel] = newNode // Store the node in the map
	return newNode                   // Returns memory address of new node
}

// Finds if a node exists in the graph
func (g *Graph) FindNode(nodeLabel string) *node {
	return g.nodeMap[nodeLabel] // Use the map for direct lookup
}

// Constructs tree from bottom up
// to: a node that has already been added
// from: a node to add
func (g *Graph) AddArc(from, to string) {
	toNode := g.FindNode(to)
	if toNode == nil {
		toNode = g.AddNode(to)
	}

	fromNode := g.FindNode(from)
	if fromNode == nil {
		fromNode = g.AddNode(from)
	}

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
	for _, n := range g.children {
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
	stack := make([]string, 0)
	current := newRoot

	oldRootNode := g.FindNode(oldRoot)

	for g.FindNode(current) != oldRootNode {
		currentNode := g.FindNode(current)
		parent := g.FindParent(currentNode.value, stack)

		if parent == nil {
			break // Handle case where parent is not found to prevent infinite loop
		}

		parent.RemoveChild(currentNode.value)
		currentNode.AddChild(parent)
		stack = append(stack, current)
		current = parent.value
	}
	return g
}