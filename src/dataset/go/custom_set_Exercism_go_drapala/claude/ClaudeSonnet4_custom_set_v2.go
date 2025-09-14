package stringset

import (
	"sort"
	"strconv"
	"strings"
)

// Set represents a collection of unique string values.
type Set map[string]struct{}

func New() Set {
	return make(Set)
}

func NewFromSlice(l []string) Set {
	s := make(Set, len(l))
	for _, elem := range l {
		s[elem] = struct{}{}
	}
	return s
}

func (s Set) String() string {
	if len(s) == 0 {
		return "{}"
	}
	
	keys := make([]string, 0, len(s))
	for k := range s {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	
	var b strings.Builder
	b.WriteByte('{')
	for i, k := range keys {
		if i > 0 {
			b.WriteString(", ")
		}
		b.WriteString(strconv.Quote(k))
	}
	b.WriteByte('}')
	return b.String()
}

func (s Set) IsEmpty() bool {
	return len(s) == 0
}

func (s Set) Has(elem string) bool {
	_, exists := s[elem]
	return exists
}

func (s Set) Add(elem string) {
	s[elem] = struct{}{}
}

func Subset(s1, s2 Set) bool {
	if len(s1) > len(s2) {
		return false
	}
	for elem := range s1 {
		if _, exists := s2[elem]; !exists {
			return false
		}
	}
	return true
}

func Disjoint(s1, s2 Set) bool {
	smaller, larger := s1, s2
	if len(s2) < len(s1) {
		smaller, larger = s2, s1
	}
	for elem := range smaller {
		if _, exists := larger[elem]; exists {
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
		if _, exists := s2[elem]; !exists {
			return false
		}
	}
	return true
}

func Intersection(s1, s2 Set) Set {
	smaller, larger := s1, s2
	if len(s2) < len(s1) {
		smaller, larger = s2, s1
	}
	
	result := make(Set)
	for elem := range smaller {
		if _, exists := larger[elem]; exists {
			result[elem] = struct{}{}
		}
	}
	return result
}

func Difference(s1, s2 Set) Set {
	result := make(Set)
	for elem := range s1 {
		if _, exists := s2[elem]; !exists {
			result[elem] = struct{}{}
		}
	}
	return result
}

func Union(s1, s2 Set) Set {
	result := make(Set, len(s1)+len(s2))
	for elem := range s1 {
		result[elem] = struct{}{}
	}
	for elem := range s2 {
		result[elem] = struct{}{}
	}
	return result
}