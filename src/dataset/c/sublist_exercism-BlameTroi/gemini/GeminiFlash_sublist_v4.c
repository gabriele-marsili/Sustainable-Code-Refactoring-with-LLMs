#include "sublist.h"
#include <stdbool.h>
#include <stddef.h>

// forward definitions
static bool areEqual(const int *left, const int *right, size_t n);
static bool isSublist(const int *sublist, size_t nSublist, const int *list, size_t nList);

// is the left list equal to the right?
static bool areEqual(const int *left, const int *right, size_t n) {
  for (size_t i = 0; i < n; ++i) {
    if (left[i] != right[i]) {
      return false;
    }
  }
  return true;
}

// is sublist a sublist of list?
static bool isSublist(const int *sublist, size_t nSublist, const int *list, size_t nList) {
  if (nSublist == 0) {
    return true;
  }

  if (nList == 0) {
    return false;
  }

  if (nSublist > nList) {
    return false;
  }

  for (size_t i = 0; i <= nList - nSublist; ++i) {
    if (areEqual(sublist, &list[i], nSublist)) {
      return true;
    }
  }

  return false;
}

// api for the comparison, lists are integer arrays with length
// explicitly passed.
comparison_result_t check_lists(const int *compareList, const int *baseList, size_t nCompareList,
                                size_t nBaseList) {
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

  if (isSublist(compareList, nCompareList, baseList, nBaseList)) {
    return SUBLIST;
  }

  if (isSublist(baseList, nBaseList, compareList, nCompareList)) {
    return SUPERLIST;
  }

  return UNEQUAL;
}