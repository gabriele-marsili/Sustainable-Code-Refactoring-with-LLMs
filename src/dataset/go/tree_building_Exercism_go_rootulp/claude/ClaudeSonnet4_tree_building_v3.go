package tree

import (
	"errors"
	"sort"
)

type Record struct {
	ID     int
	Parent int
}

type Node struct {
	ID       int
	Children []*Node
}

type ByID []*Node

func (c ByID) Len() int {
	return len(c)
}

func (c ByID) Swap(a int, b int) {
	c[a], c[b] = c[b], c[a]
}

func (c ByID) Less(a int, b int) bool {
	return c[a].ID < c[b].ID
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	seen := make(map[int]bool, len(records))
	hasRoot := false
	
	for _, record := range records {
		if seen[record.ID] {
			return &Node{}, errors.New("error duplicate node")
		}
		seen[record.ID] = true
		
		if record.ID == 0 {
			if record.Parent != 0 {
				return &Node{}, errors.New("error root node has a parent")
			}
			hasRoot = true
		} else {
			if record.ID == record.Parent {
				return &Node{}, errors.New("error direct cycle")
			}
			if record.ID < record.Parent {
				return &Node{}, errors.New("error child can not have id lower than parent")
			}
		}
		
		if record.ID >= len(records) {
			return &Node{}, errors.New("error non-continuous node")
		}
	}
	
	if !hasRoot {
		return &Node{}, errors.New("error no root node")
	}

	nodes := make(map[int]*Node, len(records))
	for _, record := range records {
		nodes[record.ID] = &Node{ID: record.ID}
	}

	childrenMap := make(map[int][]*Node)
	for _, record := range records {
		if record.ID != 0 {
			childrenMap[record.Parent] = append(childrenMap[record.Parent], nodes[record.ID])
		}
	}

	for parentID, children := range childrenMap {
		sort.Sort(ByID(children))
		nodes[parentID].Children = children
	}

	return nodes[0], nil
}

func isRootNodeHasParentError(records []Record) bool {
	for _, record := range records {
		if record.ID == 0 && record.Parent != 0 {
			return true
		}
	}
	return false
}

func isNoRootNodeError(records []Record) bool {
	for _, record := range records {
		if record.ID == 0 {
			return false
		}
	}
	return true
}

func isDuplicateNodeError(records []Record) bool {
	seen := map[int]bool{}
	for _, record := range records {
		if _, hasSeen := seen[record.ID]; hasSeen {
			return true
		}
		seen[record.ID] = true
	}
	return false
}

func isNonContinuousError(records []Record) bool {
	length := len(records)
	for _, record := range records {
		if record.ID > length-1 {
			return true
		}
	}
	return false
}

func isDirectCycleError(records []Record) bool {
	for _, record := range records {
		if record.ID == record.Parent && record.ID != 0 {
			return true
		}
	}
	return false
}

func isChildLowerThanParentError(records []Record) bool {
	for _, record := range records {
		if record.ID < record.Parent {
			return true
		}
	}
	return false
}

func contains(slice []*Node, node *Node) bool {
	for _, v := range slice {
		if v.ID == node.ID {
			return true
		}
	}
	return false
}