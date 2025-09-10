package sublist

import (
	"reflect"
)

type Relation string

func Sublist(a []int, b []int) Relation {
	lenA := len(a)
	lenB := len(b)

	if lenA == 0 && lenB > 0 {
		return "sublist"
	}
	if lenB == 0 && lenA > 0 {
		return "superlist"
	}
	if reflect.DeepEqual(a, b) {
		return "equal"
	} else if isSublist(a, b) {
		return "sublist"
	} else if isSublist(b, a) {
		return "superlist"
	} else {
		return "unequal"
	}
}

func isSublist(a []int, b []int) bool {
	lenA := len(a)
	lenB := len(b)

	if lenA == 0 {
		return true
	}

	if lenA > lenB {
		return false
	}

	for i := 0; i <= lenB-lenA; i++ {
		if reflect.DeepEqual(b[i:i+lenA], a) {
			return true
		}
	}
	return false
}