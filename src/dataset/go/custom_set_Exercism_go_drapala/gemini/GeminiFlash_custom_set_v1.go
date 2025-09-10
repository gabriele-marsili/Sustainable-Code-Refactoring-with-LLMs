package stringset

import (
	"fmt"
	"sort"
	"strings"
)

// Set is a collection of unique string values.
type Set map[string]bool

// New creates a new empty Set.
func New() Set {
	return make(Set)
}

// NewFromSlice creates a new Set from a slice of strings.
func NewFromSlice(l []string) Set {
	s := make(Set, len(l))
	for _, elem := range l {
		s[elem] = true
	}
	return s
}

// String returns a string representation of the Set.
func (s Set) String() string {
	if len(s) == 0 {
		return "{}"
	}

	elements := make([]string, 0, len(s))
	for elem := range s {
		elements = append(elements, fmt.Sprintf("%q", elem))
	}
	sort.Strings(elements) // Ensure consistent order

	return fmt.Sprintf("{%s}", strings.Join(elements, ", "))
}

// IsEmpty returns true if the Set is empty.
func (s Set) IsEmpty() bool {
	return len(s) == 0
}

// Has returns true if the Set contains the given element.
func (s Set) Has(elem string) bool {
	return s[elem]
}

// Add adds the given element to the Set.
func (s Set) Add(elem string) {
	s[elem] = true
}

// Subset returns true if s1 is a subset of s2.
func Subset(s1, s2 Set) bool {
	if len(s1) > len(s2) {
		return false
	}
	for elem := range s1 {
		if !s2[elem] {
			return false
		}
	}
	return true
}

// Disjoint returns true if s1 and s2 have no elements in common.
func Disjoint(s1, s2 Set) bool {
	if len(s1) == 0 || len(s2) == 0 {
		return true
	}
	smaller, larger := s1, s2
	if len(s2) < len(s1) {
		smaller, larger = s2, s1
	}

	for elem := range smaller {
		if larger[elem] {
			return false
		}
	}
	return true
}

// Equal returns true if s1 and s2 contain the same elements.
func Equal(s1, s2 Set) bool {
	if len(s1) != len(s2) {
		return false
	}
	for elem := range s1 {
		if !s2[elem] {
			return false
		}
	}
	return true
}

// Intersection returns a new Set containing the elements that are in both s1 and s2.
func Intersection(s1, s2 Set) Set {
	smaller, larger := s1, s2
	if len(s2) < len(s1) {
		smaller, larger = s2, s1
	}

	intersection := make(Set)
	for elem := range smaller {
		if larger[elem] {
			intersection[elem] = true
		}
	}
	return intersection
}

// Difference returns a new Set containing the elements that are in s1 but not in s2.
func Difference(s1, s2 Set) Set {
	difference := make(Set)
	for elem := range s1 {
		if !s2[elem] {
			difference[elem] = true
		}
	}
	return difference
}

// Union returns a new Set containing all the elements that are in s1 or s2.
func Union(s1, s2 Set) Set {
	union := make(Set, len(s1)+len(s2)) // Pre-allocate for potential size
	for elem := range s1 {
		union[elem] = true
	}
	for elem := range s2 {
		union[elem] = true
	}
	return union
}