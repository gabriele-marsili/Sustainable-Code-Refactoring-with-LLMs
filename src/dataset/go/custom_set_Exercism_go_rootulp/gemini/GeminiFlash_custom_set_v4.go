package stringset

import (
	"fmt"
	"strings"
)

// Implement Set as a collection of unique string values.
//
// For Set.String, use '{' and '}', output elements as double-quoted strings
// safely escaped with Go syntax, and use a comma and a single space between
// elements. For example, a set with 2 elements, "a" and "b", should be formatted as {"a", "b"}.
// Format the empty set as {}.

// Define the Set type here.
type Set struct {
	set map[string]bool
}

func New() Set {
	return Set{set: make(map[string]bool)}
}

func NewFromSlice(slice []string) (result Set) {
	result = Set{set: make(map[string]bool, len(slice))}
	for _, element := range slice {
		result.set[element] = true
	}
	return result
}

func (s Set) String() string {
	if len(s.set) == 0 {
		return "{}"
	}

	var sb strings.Builder
	sb.WriteString("{")

	first := true
	for key := range s.set {
		if !first {
			sb.WriteString(", ")
		}
		sb.WriteString(fmt.Sprintf("\"%s\"", key))
		first = false
	}

	sb.WriteString("}")
	return sb.String()
}

func (s Set) IsEmpty() bool {
	return len(s.set) == 0
}

func (s Set) Has(elem string) bool {
	_, ok := s.set[elem]
	return ok
}

func (s Set) Add(elem string) {
	s.set[elem] = true
}

func Subset(s1, s2 Set) bool {
	for key := range s1.set {
		if !s2.Has(key) {
			return false
		}
	}
	return true
}

func Disjoint(s1, s2 Set) bool {
	if len(s1.set) == 0 || len(s2.set) == 0 {
		return true
	}
	for key := range s1.set {
		if s2.Has(key) {
			return false
		}
	}
	return true
}

func Equal(s1, s2 Set) bool {
	if len(s1.set) != len(s2.set) {
		return false
	}
	for key := range s1.set {
		if !s2.Has(key) {
			return false
		}
	}
	return true
}

func Intersection(s1, s2 Set) (result Set) {
	result = New()
	smaller := s1
	larger := s2
	if len(s2.set) < len(s1.set) {
		smaller = s2
		larger = s1
	}
	for key := range smaller.set {
		if larger.Has(key) {
			result.Add(key)
		}
	}
	return result
}

func Difference(s1, s2 Set) (result Set) {
	result = New()
	for key := range s1.set {
		if !s2.Has(key) {
			result.Add(key)
		}
	}
	return result
}

func Union(s1, s2 Set) (result Set) {
	result = Set{set: make(map[string]bool, len(s1.set)+len(s2.set))}
	for key := range s1.set {
		result.set[key] = true
	}
	for key := range s2.set {
		result.set[key] = true
	}
	return result
}