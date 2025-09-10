package stringset

import (
	"bytes"
	"sort"
	"strings"
)

type Set map[string]struct{}

func New() Set {
	return make(Set)
}

func NewFromSlice(l []string) Set {
	s := New()
	for _, elem := range l {
		s[elem] = struct{}{}
	}
	return s
}

func (s Set) String() string {
	if len(s) == 0 {
		return "{}"
	}
	var buf bytes.Buffer
	buf.WriteString("{")
	elements := make([]string, 0, len(s))
	for elem := range s {
		elements = append(elements, strconv.Quote(elem))
	}
	sort.Strings(elements)
	buf.WriteString(strings.Join(elements, ", "))
	buf.WriteString("}")
	return buf.String()
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
	for elem := range s1 {
		if !s2.Has(elem) {
			return false
		}
	}
	return true
}

func Disjoint(s1, s2 Set) bool {
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
	result := New()
	for elem := range s1 {
		if s2.Has(elem) {
			result.Add(elem)
		}
	}
	return result
}

func Difference(s1, s2 Set) Set {
	result := New()
	for elem := range s1 {
		if !s2.Has(elem) {
			result.Add(elem)
		}
	}
	return result
}

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