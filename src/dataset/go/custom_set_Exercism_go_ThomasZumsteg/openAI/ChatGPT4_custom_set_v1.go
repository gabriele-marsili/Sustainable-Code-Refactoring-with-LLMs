package stringset

import (
	"fmt"
	"strings"
)

/*TestVersion is the unit test this will pass.*/
const TestVersion = 2

/*Set is an unordered collection of items with only a single copy of each item.*/
type Set map[string]struct{}

/*New creates a new empty set*/
func New() Set {
	return Set{}
}

/*NewFromSlice creates a new set containing the elements in a slice.*/
func NewFromSlice(slice []string) Set {
	s := New()
	for _, v := range slice {
		s[v] = struct{}{}
	}
	return s
}

/*Add adds an item to the set.*/
func (s Set) Add(str string) {
	s[str] = struct{}{}
}

/*Delete removes an item from the set.*/
func (s Set) Delete(str string) {
	delete(s, str)
}

/*Has is true if the item is in the set.*/
func (s Set) Has(str string) bool {
	_, ok := s[str]
	return ok
}

/*IsEmpty is true if there are no items in the set.*/
func (s Set) IsEmpty() bool {
	return len(s) == 0
}

/*Len counts the number of items in the set.*/
func (s Set) Len() int {
	return len(s)
}

/*Slice formats a set as an array slice.*/
func (s Set) Slice() []string {
	keys := make([]string, 0, len(s))
	for key := range s {
		keys = append(keys, key)
	}
	return keys
}

/*String formats a set as a string.*/
func (s Set) String() string {
	var items []string
	for key := range s {
		items = append(items, fmt.Sprintf("\"%v\"", key))
	}
	return "{" + strings.Join(items, ", ") + "}"
}

/*Equal determines if two sets have all elements in common.*/
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

/*Subset determines if the first set has all elements in common with the second.*/
func Subset(s1, s2 Set) bool {
	for key := range s1 {
		if !s2.Has(key) {
			return false
		}
	}
	return true
}

/*Disjoint determines if two sets have no elements in common.*/
func Disjoint(s1, s2 Set) bool {
	for key := range s1 {
		if s2.Has(key) {
			return false
		}
	}
	return true
}

/*Intersection calculates the set of elements two sets have in common.*/
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

/*Union calculates the set of elements that either of two sets have in common.*/
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

/*Difference calculates the set of elements in the first set but not in the second.*/
func Difference(s1, s2 Set) Set {
	difference := New()
	for key := range s1 {
		if !s2.Has(key) {
			difference.Add(key)
		}
	}
	return difference
}

/*SymmetricDifference calculates the set of elements that are only in one set.*/
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