package stringset

import (
	"fmt"
	"sort"
	"strings"
)

// Implement Set as a collection of unique string values.
//
// For Set.String, use '{' and '}', output elements as double-quoted strings
// safely escaped with Go syntax, and use a comma and a single space between
// elements. For example, a set with 2 elements, "a" and "b", should be formatted as {"a", "b"}.
// Format the empty set as {}.

// Define the Set type here.
type Set map[string]bool

func New() Set {
	return make(Set)
}

func NewFromSlice(l []string) Set {
	s := make(Set)
	for _, elem := range l {
		s[elem] = true
	}
	return s
}

func (s Set) String() string {
	if len(s) == 0 {
		return "{}"
	}

	elements := make([]string, 0, len(s))
	for elem := range s {
		elements = append(elements, fmt.Sprintf("%q", elem))
	}
	sort.Strings(elements) // Ensure consistent output order

	return fmt.Sprintf("{%s}", strings.Join(elements, ", "))
}

func (s Set) IsEmpty() bool {
	return len(s) == 0
}

func (s Set) Has(elem string) bool {
	_, ok := s[elem]
	return ok
}

func (s Set) Add(elem string) {
	s[elem] = true
}

func Subset(s1, s2 Set) bool {
	if len(s1) > len(s2) {
		return false
	}
	for elem := range s1 {
		if !s2.Has(elem) {
			return false
		}
	}
	return true
}

func Disjoint(s1, s2 Set) bool {
	if len(s1) == 0 || len(s2) == 0 {
		return true
	}
	for elem := range s1 {
		if s2.Has(elem) {
			return false
		}
	}
	return true
}

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

func Intersection(s1, s2 Set) Set {
	smaller := s1
	larger := s2
	if len(s2) < len(s1) {
		smaller = s2
		larger = s1
	}

	intersection := make(Set)
	for elem := range smaller {
		if larger.Has(elem) {
			intersection[elem] = true
		}
	}
	return intersection
}

func Difference(s1, s2 Set) Set {
	difference := make(Set)
	for elem := range s1 {
		if !s2.Has(elem) {
			difference[elem] = true
		}
	}
	return difference
}

func Union(s1, s2 Set) Set {
	union := make(Set)
	for elem := range s1 {
		union[elem] = true
	}
	for elem := range s2 {
		union[elem] = true
	}
	return union
}