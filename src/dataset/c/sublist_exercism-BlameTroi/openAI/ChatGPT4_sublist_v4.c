#include "sublist.h"
#include <stdbool.h>
#include <string.h>

// Check if two lists are equal
static inline bool areEqual(int *left, int *right, size_t nLeft, size_t nRight) {
    return (nLeft == nRight) && (memcmp(left, right, nLeft * sizeof(int)) == 0);
}

// Check if the left list is contained in the right list
static bool containedIn(int *left, int *right, size_t nLeft, size_t nRight) {
    if (nLeft == 0) return true;
    if (nLeft > nRight) return false;

    for (size_t i = 0; i <= nRight - nLeft; i++) {
        if (memcmp(left, right + i, nLeft * sizeof(int)) == 0)
            return true;
    }
    return false;
}

// API for the comparison, lists are integer arrays with length explicitly passed
comparison_result_t check_lists(int *compareList, int *baseList, size_t nCompareList, size_t nBaseList) {
    if (areEqual(compareList, baseList, nCompareList, nBaseList))
        return EQUAL;

    if (nCompareList == 0)
        return SUBLIST;
    if (nBaseList == 0)
        return SUPERLIST;

    if (containedIn(compareList, baseList, nCompareList, nBaseList))
        return SUBLIST;
    if (containedIn(baseList, compareList, nBaseList, nCompareList))
        return SUPERLIST;

    return UNEQUAL;
}