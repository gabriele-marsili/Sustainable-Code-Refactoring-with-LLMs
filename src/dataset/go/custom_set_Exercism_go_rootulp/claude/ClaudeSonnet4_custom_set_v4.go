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
	return Set{make(map[string]struct{})}
}

func NewFromSlice(slice []string) Set {
	result := Set{make(map[string]struct{}, len(slice))}
	for _, element := range slice {
		result.set[element] = struct{}{}
	}
	return result
}

func (s Set) String() string {
	if len(s.set) == 0 {
		return "{}"
	}
	
	keys := make([]string, 0, len(s.set))
	for key := range s.set {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	
	var builder strings.Builder
	builder.WriteByte('{')
	for i, key := range keys {
		if i > 0 {
			builder.WriteString(", ")
		}
		builder.WriteByte('"')
		builder.WriteString(key)
		builder.WriteByte('"')
	}
	builder.WriteByte('}')
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
	if len(s1.set) > len(s2.set) {
		return false
	}
	for key := range s1.set {
		if !s2.Has(key) {
			return false
		}
	}
	return true
}

func Disjoint(s1, s2 Set) bool {
	smaller, larger := s1.set, s2.set
	if len(s2.set) < len(s1.set) {
		smaller, larger = s2.set, s1.set
	}
	
	for key := range smaller {
		if _, exists := larger[key]; exists {
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
		if _, exists := s2.set[key]; !exists {
			return false
		}
	}
	return true
}

func Intersection(s1, s2 Set) Set {
	smaller, larger := s1.set, s2.set
	if len(s2.set) < len(s1.set) {
		smaller, larger = s2.set, s1.set
	}
	
	result := Set{make(map[string]struct{})}
	for key := range smaller {
		if _, exists := larger[key]; exists {
			result.set[key] = struct{}{}
		}
	}
	return result
}

func Difference(s1, s2 Set) Set {
	result := Set{make(map[string]struct{})}
	for key := range s1.set {
		if !s2.Has(key) {
			result.set[key] = struct{}{}
		}
	}
	return result
}

func Union(s1, s2 Set) Set {
	result := Set{make(map[string]struct{}, len(s1.set)+len(s2.set))}
	for key := range s1.set {
		result.set[key] = struct{}{}
	}
	for key := range s2.set {
		result.set[key] = struct{}{}
	}
	return result
}

func (s Set) formattedKeys() []string {
	keys := make([]string, 0, len(s.set))
	for key := range s.set {
		keys = append(keys, fmt.Sprintf(`"%s"`, key))
	}
	return keys
}

func (s Set) keys() []string {
	keys := make([]string, 0, len(s.set))
	for key := range s.set {
		keys = append(keys, key)
	}
	return keys
}