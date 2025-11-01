#include "sublist.h"
#include <stdbool.h>
#include <string.h>

static bool areEqual(int *left, int *right, size_t nLeft, size_t nRight) {
    if (nLeft != nRight)
        return false;
    return memcmp(left, right, nLeft * sizeof(int)) == 0;
}

static bool containedIn(int *left, int *right, size_t nLeft, size_t nRight) {
    if (nLeft == 0)
        return true;
    
    if (nLeft > nRight)
        return false;
    
    if (nLeft == nRight)
        return areEqual(left, right, nLeft, nRight);
    
    size_t maxStart = nRight - nLeft;
    for (size_t i = 0; i <= maxStart; i++) {
        if (memcmp(left, right + i, nLeft * sizeof(int)) == 0)
            return true;
    }
    
    return false;
}

comparison_result_t check_lists(int *compareList, int *baseList, 
                               size_t nCompareList, size_t nBaseList) {
    if (nCompareList == nBaseList) {
        return areEqual(compareList, baseList, nCompareList, nBaseList) ? 
               EQUAL : UNEQUAL;
    }
    
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