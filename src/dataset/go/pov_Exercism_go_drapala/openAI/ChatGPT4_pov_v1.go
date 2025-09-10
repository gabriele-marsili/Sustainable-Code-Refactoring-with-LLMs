package pov

import (
	"fmt"
)

// Define the Graph type here.
type Graph struct {
	value    string
	children map[string]*node
}

type node struct {
	value    string
	children map[string]*node
}

// Creates a new graph
func New() *Graph {
	return &Graph{children: make(map[string]*node)}
}

// Returns a node with the value
func NewNode(nodeLabel string) *node {
	return &node{value: nodeLabel, children: make(map[string]*node)}
}

// Adds leaf nodes to the graph
func (g *Graph) AddNode(nodeLabel string) *node {
	newNode := NewNode(nodeLabel)
	g.children[nodeLabel] = newNode
	return newNode
}

// Finds if a node exists in the graph
func (g *Graph) FindNode(nodeLabel string) *node {
	return g.children[nodeLabel]
}

// Constructs tree from bottom up
// to: a node that has already been added
// from: a node to add
func (g *Graph) AddArc(from, to string) {
	fromNode, exists := g.children[from]
	if !exists {
		fromNode = g.AddNode(from)
	}
	toNode := g.FindNode(to)
	if toNode != nil {
		fromNode.children[to] = toNode
	}
}

// Dump method
// Returns a list of all arcs in the graph
// from -> to
func (g *Graph) ArcList() []string {
	arcs := make([]string, 0, len(g.children))
	for _, n := range g.children {
		for _, c := range n.children {
			arcs = append(arcs, fmt.Sprintf("%s -> %s", n.value, c.value))
		}
	}
	return arcs
}

// Find the Parent of a node
func (g *Graph) FindParent(child string, skip map[string]struct{}) *node {
	for _, n := range g.children {
		if _, skipped := skip[n.value]; skipped {
			continue
		}
		if _, exists := n.children[child]; exists {
			return n
		}
	}
	return nil
}

// Remove a child from a node
func (n *node) RemoveChild(child string) {
	delete(n.children, child)
}

// Adds a child from a node
func (n *node) AddChild(child *node) {
	n.children[child.value] = child
}

// Change the root of the graph
// We will change g in place
func (g *Graph) ChangeRoot(oldRoot, newRoot string) *Graph {
	skip := make(map[string]struct{})
	current := newRoot
	for current != oldRoot {
		currentNode := g.FindNode(current)
		parent := g.FindParent(current, skip)
		if parent == nil {
			break
		}
		parent.RemoveChild(current)
		currentNode.AddChild(parent)
		skip[current] = struct{}{}
		current = parent.value
	}
	return g
}