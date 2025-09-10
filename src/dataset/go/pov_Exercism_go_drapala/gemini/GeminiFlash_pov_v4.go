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

// Constructs tree from bottom up
// to: a node that has already been added
// from: a node to add
func (g *Graph) AddArc(from, to string) {
	fromNode := g.AddNode(from)
	toNode := g.FindNode(to)

	exists := false
	for _, child := range fromNode.children {
		if child == toNode {
			exists = true
			break
		}
	}
	if !exists {
		fromNode.children = append(fromNode.children, toNode)
	}
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

// Find the Parent of a node
func (g *Graph) FindParent(child string, skip map[string]bool) *node {
	for _, n := range g.nodes {
		for _, c := range n.children {
			if c.value == child && !skip[n.value] {
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
	skip := make(map[string]bool)
	current := newRoot

	for current != oldRoot {
		currentNode := g.FindNode(current)
		parent := g.FindParent(currentNode.value, skip)
		parent.RemoveChild(currentNode.value)
		currentNode.AddChild(parent)
		skip[current] = true
		current = parent.value
	}
	return g
}