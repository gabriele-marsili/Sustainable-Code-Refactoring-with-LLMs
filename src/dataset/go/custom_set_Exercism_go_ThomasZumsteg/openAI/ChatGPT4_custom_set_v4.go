package stringset

import (
	"fmt"
	"strings"
)

const TestVersion = 2

type Set map[string]struct{}

func New() Set {
	return Set{}
}

func NewFromSlice(slice []string) Set {
	s := New()
	for _, v := range slice {
		s[v] = struct{}{}
	}
	return s
}

func (s Set) Add(str string) {
	s[str] = struct{}{}
}

func (s Set) Delete(str string) {
	delete(s, str)
}

func (s Set) Has(str string) bool {
	_, ok := s[str]
	return ok
}

func (s Set) IsEmpty() bool {
	return len(s) == 0
}

func (s Set) Len() int {
	return len(s)
}

func (s Set) Slice() []string {
	keys := make([]string, 0, len(s))
	for key := range s {
		keys = append(keys, key)
	}
	return keys
}

func (s Set) String() string {
	var items []string
	for key := range s {
		items = append(items, fmt.Sprintf("\"%v\"", key))
	}
	return "{" + strings.Join(items, ", ") + "}"
}

func Equal(s1, s2 Set) bool {
	if len(s1) != len(s2) {
		return false
	}
	for key := range s1 {
		if !s2.Has(key) {
			return false
		}
	}
	return true
}

func Subset(s1, s2 Set) bool {
	for key := range s1 {
		if !s2.Has(key) {
			return false
		}
	}
	return true
}

func Disjoint(s1, s2 Set) bool {
	for key := range s1 {
		if s2.Has(key) {
			return false
		}
	}
	return true
}

func Intersection(s1, s2 Set) Set {
	intersection := New()
	if len(s1) > len(s2) {
		s1, s2 = s2, s1
	}
	for key := range s1 {
		if s2.Has(key) {
			intersection.Add(key)
		}
	}
	return intersection
}

func Union(s1, s2 Set) Set {
	union := New()
	for key := range s1 {
		union.Add(key)
	}
	for key := range s2 {
		union.Add(key)
	}
	return union
}

func Difference(s1, s2 Set) Set {
	difference := New()
	for key := range s1 {
		if !s2.Has(key) {
			difference.Add(key)
		}
	}
	return difference
}

func SymmetricDifference(s1, s2 Set) Set {
	symmetricDifference := New()
	for key := range s1 {
		if !s2.Has(key) {
			symmetricDifference.Add(key)
		}
	}
	for key := range s2 {
		if !s1.Has(key) {
			symmetricDifference.Add(key)
		}
	}
	return symmetricDifference
}