#include "sublist.h"
#include <stdbool.hinclude "sublist.h"
#include <stdbool.h>

static bool array_equals(int *arr1, int *arr2, size_t len) {
    for (size_t i = 0; i < len; ++i) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

static int find_sublist(int *haystack, int *needle, size_t haystack_len, size_t needle_len) {
    if (needle_len == 0) {
        return 0; 
    }

    for (size_t i = 0; i <= haystack_len - needle_len; ++i) {
        if (array_equals(haystack + i, needle, needle_len)) {
            return i;
        }
    }
    return -1;
}

comparison_result_t check_lists(int *list, int *base, size_t list_len, size_t base_len) {
    if (list == NULL) {
        return (base == NULL) ? EQUAL : SUBLIST;
    }
    if (base == NULL) {
        return SUPERLIST;
    }

    if (list_len == base_len) {
        if (array_equals(list, base, list_len)) {
            return EQUAL;
        } else {
            return UNEQUAL;
        }
    }

    if (list_len > base_len) {
        if (find_sublist(list, base, list_len, base_len) != -1) {
            return SUPERLIST;
        }
    } else {
        if (find_sublist(base, list, base_len, list_len) != -1) {
            return SUBLIST;
        }
    }

    return UNEQUAL;
}