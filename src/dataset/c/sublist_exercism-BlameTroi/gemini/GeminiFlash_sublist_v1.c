#include "sublist.h"
#include <stdbool.h>
#include <stddef.h>

// is the left list equal to the right?
static bool areEqual(const int *left, const int *right, size_t n) {
  for (size_t i = 0; i < n; ++i) {
    if (left[i] != right[i]) {
      return false;
    }
  }
  return true;
}

// is the left list contained in the right?
static bool containedIn(const int *left, size_t nLeft, const int *right,
                        size_t nRight) {
  if (nLeft > nRight) {
    return false;
  }

  for (size_t i = 0; i <= nRight - nLeft; ++i) {
    if (areEqual(left, right + i, nLeft)) {
      return true;
    }
  }

  return false;
}

comparison_result_t check_lists(const int *compareList, const int *baseList,
                                size_t nCompareList, size_t nBaseList) {
  if (nCompareList == nBaseList) {
    if (areEqual(compareList, baseList, nCompareList)) {
      return EQUAL;
    } else {
      return UNEQUAL;
    }
  }

  if (nCompareList == 0) {
    return SUBLIST;
  }
  if (nBaseList == 0) {
    return SUPERLIST;
  }

  if (containedIn(compareList, nCompareList, baseList, nBaseList)) {
    return SUBLIST;
  }
  if (containedIn(baseList, nBaseList, compareList, nCompareList)) {
    return SUPERLIST;
  }

  return UNEQUAL;
}