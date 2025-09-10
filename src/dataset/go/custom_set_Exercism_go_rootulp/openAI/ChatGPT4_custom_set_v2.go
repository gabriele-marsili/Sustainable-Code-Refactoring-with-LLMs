package stringset

import (
	"fmt"
	"sort"
	"strings"
)

type Set struct {
	set map[string]struct{}
}

func New() Set {
	return Set{set: make(map[string]struct{})}
}

func NewFromSlice(slice []string) Set {
	result := New()
	for _, element := range slice {
		result.Add(element)
	}
	return result
}

func (s Set) String() string {
	if len(s.set) == 0 {
		return "{}"
	}
	keys := s.keys()
	sort.Strings(keys)
	var builder strings.Builder
	builder.WriteString("{")
	for i, key := range keys {
		if i > 0 {
			builder.WriteString(", ")
		}
		builder.WriteString(fmt.Sprintf("%q", key))
	}
	builder.WriteString("}")
	return builder.String()
}

func (s Set) IsEmpty() bool {
	return len(s.set) == 0
}

func (s Set) Has(elem string) bool {
	_, ok := s.set[elem]
	return ok
}

func (s Set) Add(elem string) {
	s.set[elem] = struct{}{}
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

func Intersection(s1, s2 Set) Set {
	result := New()
	if len(s1.set) > len(s2.set) {
		s1, s2 = s2, s1
	}
	for key := range s1.set {
		if s2.Has(key) {
			result.Add(key)
		}
	}
	return result
}

func Difference(s1, s2 Set) Set {
	result := New()
	for key := range s1.set {
		if !s2.Has(key) {
			result.Add(key)
		}
	}
	return result
}

func Union(s1, s2 Set) Set {
	result := New()
	for key := range s1.set {
		result.Add(key)
	}
	for key := range s2.set {
		result.Add(key)
	}
	return result
}

func (s Set) keys() []string {
	keys := make([]string, 0, len(s.set))
	for key := range s.set {
		keys = append(keys, key)
	}
	return keys
}