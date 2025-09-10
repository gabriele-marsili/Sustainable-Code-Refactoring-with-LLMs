package pov

import (
	"fmt"
)

type Graph struct {
	value    string
	children map[string]*node
}

type node struct {
	value    string
	children map[string]*node
}

func New() *Graph {
	return &Graph{children: make(map[string]*node)}
}

func NewNode(nodeLabel string) *node {
	return &node{value: nodeLabel, children: make(map[string]*node)}
}

func (g *Graph) AddNode(nodeLabel string) *node {
	newNode := NewNode(nodeLabel)
	g.children[nodeLabel] = newNode
	return newNode
}

func (g *Graph) FindNode(nodeLabel string) *node {
	return g.children[nodeLabel]
}

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

func (g *Graph) ArcList() []string {
	arcs := make([]string, 0, len(g.children))
	for _, n := range g.children {
		for _, c := range n.children {
			arcs = append(arcs, fmt.Sprintf("%s -> %s", n.value, c.value))
		}
	}
	return arcs
}

func (g *Graph) FindParent(child string, skip map[string]struct{}) *node {
	for _, n := range g.children {
		if _, ok := skip[n.value]; ok {
			continue
		}
		if _, exists := n.children[child]; exists {
			return n
		}
	}
	return nil
}

func (n *node) RemoveChild(child string) {
	delete(n.children, child)
}

func (n *node) AddChild(child *node) {
	n.children[child.value] = child
}

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