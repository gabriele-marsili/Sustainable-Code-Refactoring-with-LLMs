package stringset

import (
	"strings"
)

// Set represents a collection of unique string values.
type Set map[string]struct{}

// New creates and returns a new empty Set.
func New() Set {
	return make(Set)
}

// NewFromSlice creates a Set from a slice of strings.
func NewFromSlice(l []string) Set {
	s := New()
	for _, elem := range l {
		s[elem] = struct{}{}
	}
	return s
}

// String returns the string representation of the Set.
func (s Set) String() string {
	if len(s) == 0 {
		return "{}"
	}
	var b strings.Builder
	b.WriteString("{")
	first := true
	for elem := range s {
		if !first {
			b.WriteString(", ")
		}
		b.WriteString(`"` + strings.ReplaceAll(elem, `"`, `\"`) + `"`)
		first = false
	}
	b.WriteString("}")
	return b.String()
}

// IsEmpty checks if the Set is empty.
func (s Set) IsEmpty() bool {
	return len(s) == 0
}

// Has checks if the Set contains the given element.
func (s Set) Has(elem string) bool {
	_, exists := s[elem]
	return exists
}

// Add adds an element to the Set.
func (s Set) Add(elem string) {
	s[elem] = struct{}{}
}

// Subset checks if s1 is a subset of s2.
func Subset(s1, s2 Set) bool {
	for elem := range s1 {
		if !s2.Has(elem) {
			return false
		}
	}
	return true
}

// Disjoint checks if s1 and s2 are disjoint.
func Disjoint(s1, s2 Set) bool {
	for elem := range s1 {
		if s2.Has(elem) {
			return false
		}
	}
	return true
}

// Equal checks if s1 and s2 are equal.
func Equal(s1, s2 Set) bool {
	if len(s1) != len(s2) {
		return false
	}
	for elem := range s1 {
		if !s2.Has(elem) {
			return false
		}
	}
	return true
}

// Intersection returns a new Set with elements common to s1 and s2.
func Intersection(s1, s2 Set) Set {
	result := New()
	for elem := range s1 {
		if s2.Has(elem) {
			result.Add(elem)
		}
	}
	return result
}

// Difference returns a new Set with elements in s1 but not in s2.
func Difference(s1, s2 Set) Set {
	result := New()
	for elem := range s1 {
		if !s2.Has(elem) {
			result.Add(elem)
		}
	}
	return result
}

// Union returns a new Set with all elements from s1 and s2.
func Union(s1, s2 Set) Set {
	result := NewFromSlice(nil)
	for elem := range s1 {
		result.Add(elem)
	}
	for elem := range s2 {
		result.Add(elem)
	}
	return result
}