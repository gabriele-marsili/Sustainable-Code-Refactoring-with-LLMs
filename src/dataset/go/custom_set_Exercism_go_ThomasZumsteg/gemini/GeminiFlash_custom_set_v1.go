package stringset

import (
	"fmt"
	"strings"
)

/*TestVersion is the unit test this will pass.*/
const TestVersion = 2

/*Set is an unordered collection of items with only a single copy of each item.*/
type Set map[string]bool

/*New creats a new empty set*/
func New() Set {
	return make(Set)
}

/*NewFromSlice creates a new set containing the elements in a slice.*/
func NewFromSlice(slice []string) Set {
	s := make(Set, len(slice))
	for _, v := range slice {
		s[v] = true
	}
	return s
}

/*Add adds an item to the set.*/
func (s Set) Add(str string) {
	s[str] = true
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

/*Len counts the numer of items in the set.*/
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
	items := make([]string, 0, len(s))
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
	for k := range s1 {
		if !s2.Has(k) {
			return false
		}
	}
	return true
}

/*Subset determines if the first set has all elemets in common with the second.*/
func Subset(s1, s2 Set) bool {
	if len(s1) > len(s2) {
		return false
	}
	for k := range s1 {
		if !s2.Has(k) {
			return false
		}
	}
	return true
}

/*Disjoint determines if two sets have no elements in common.*/
func Disjoint(s1, s2 Set) bool {
	if len(s1) == 0 || len(s2) == 0 {
		return true
	}
	for k := range s1 {
		if s2.Has(k) {
			return false
		}
	}
	return true
}

/*Intersection caluclates the set of elements two set have in common.*/
func Intersection(s1, s2 Set) Set {
	smaller, larger := s1, s2
	if len(s2) < len(s1) {
		smaller, larger = s2, s1
	}
	intersection := New()
	for k := range smaller {
		if larger.Has(k) {
			intersection[k] = true
		}
	}
	return intersection
}

/*Union calculates the set of elements that either of two sets have in common.*/
func Union(s1, s2 Set) Set {
	union := make(Set, len(s1)+len(s2))
	for k := range s1 {
		union[k] = true
	}
	for k := range s2 {
		union[k] = true
	}
	return union
}

/*Difference calculates the set of elements in the first set but not in the second.*/
func Difference(s1, s2 Set) Set {
	difference := New()
	for k := range s1 {
		if !s2.Has(k) {
			difference[k] = true
		}
	}
	return difference
}

/*SymmetricDifference calculates the set of elements that are only on one set.*/
func SymmetricDifference(s1, s2 Set) Set {
	result := New()

	for k := range s1 {
		if !s2.Has(k) {
			result[k] = true
		}
	}

	for k := range s2 {
		if !s1.Has(k) {
			result[k] = true
		}
	}

	return result
}