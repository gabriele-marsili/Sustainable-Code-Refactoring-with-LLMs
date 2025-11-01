// exercism sublist -- are either of two lists sublists
// of the other?
//
// list a is a sublist of list b if by dropping 0 or more
// elements from the front and/or back, you get a list
// that's completely equal to list a.
//
// t.brumley, june 2022.

#include "sublist.h"
#include <stdbool.h>
#include <string.h>

// forward definitions
static
bool areEqual(
		int *left,
		int *right,
		size_t nLeft,
		size_t nRight);

static
bool containedIn(
		int *left,
		int *right,
		size_t nLeft,
		size_t nRight);

// is the left list equal to the right?
static
bool areEqual(
		int *left,
		int *right,
		size_t nLeft,
		size_t nRight) {
	if (nLeft != nRight)
		return false;
	return memcmp(left, right, nLeft * sizeof(int)) == 0;
}

// is the left list contained in the right?
static
bool containedIn(
		int *left,
		int *right,
		size_t nLeft,
		size_t nRight) {

	if (nLeft == 0)
		return true;

	if (nLeft > nRight)
		return false;

	// match left against first nLeft of right, checking for equal
	size_t maxOffset = nRight - nLeft + 1;
	for (size_t i = 0; i < maxOffset; i++) {
		if (memcmp(left, right + i, nLeft * sizeof(int)) == 0)
			return true;
	}

	return false;
}

// api for the comparison, lists are integer arrays with length
// explicitly passed.
comparison_result_t check_lists(
		int *compareList,
		int *baseList,
		size_t nCompareList,
		size_t nBaseList) {

	// handle empty lists first
	if (nCompareList == 0) {
		return (nBaseList == 0) ? EQUAL : SUBLIST;
	}
	if (nBaseList == 0) {
		return SUPERLIST;
	}

	// if the lists are the same length, then this is a straight equality check
	if (nCompareList == nBaseList) {
		return areEqual(compareList, baseList, nCompareList, nBaseList) ? EQUAL : UNEQUAL;
	}

	// both lists have elements, see if one is contained in the other
	if (containedIn(compareList, baseList, nCompareList, nBaseList))
		return SUBLIST;
	if (containedIn(baseList, compareList, nBaseList, nCompareList))
		return SUPERLIST;

	// no hope
	return UNEQUAL;
}