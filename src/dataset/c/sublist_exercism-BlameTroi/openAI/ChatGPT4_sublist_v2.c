#include "sublist.h"
#include <stdbool.h>
#include <string.h>

// Optimized areEqual function using memcmp for better performance
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

// Optimized containedIn function
static
bool containedIn(
		int *left,
		int *right,
		size_t nLeft,
		size_t nRight) {

	if (nLeft == 0)
		return true; // An empty list is always a sublist

	if (nLeft > nRight)
		return false;

	// Use a sliding window approach for better efficiency
	for (size_t i = 0; i <= nRight - nLeft; i++) {
		if (areEqual(left, right + i, nLeft, nLeft))
			return true;
	}

	return false;
}

// Optimized API for the comparison
comparison_result_t check_lists(
		int *compareList,
		int *baseList,
		size_t nCompareList,
		size_t nBaseList) {

	// Handle empty list cases first
	if (nCompareList == 0)
		return SUBLIST;
	if (nBaseList == 0)
		return SUPERLIST;

	// Check for equality
	if (nCompareList == nBaseList && areEqual(compareList, baseList, nCompareList, nBaseList))
		return EQUAL;

	// Check if one list is a sublist of the other
	if (containedIn(compareList, baseList, nCompareList, nBaseList))
		return SUBLIST;
	if (containedIn(baseList, compareList, nBaseList, nCompareList))
		return SUPERLIST;

	// If none of the above, the lists are unequal
	return UNEQUAL;
}