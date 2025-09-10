#include "sublist.h"
#include <stdbool.h>

static bool arrays_equal(int *arr1, int *arr2, size_t len) {
    for (size_t i = 0; i < len; ++i) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

static int find_sublist(int *haystack, size_t haystack_len, int *needle, size_t needle_len) {
    if (needle_len == 0) {
        return 0;
    }

    if (haystack_len == 0 || needle_len > haystack_len) {
        return -1;
    }

    for (size_t i = 0; i <= haystack_len - needle_len; ++i) {
        if (haystack[i] == needle[0]) {
            if (arrays_equal(haystack + i, needle, needle_len)) {
                return i;
            }
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
        return (arrays_equal(list, base, list_len)) ? EQUAL : UNEQUAL;
    }

    if (list_len > base_len) {
        if (find_sublist(list, list_len, base, base_len) != -1) {
            return SUPERLIST;
        }
    } else {
        if (find_sublist(base, base_len, list, list_len) != -1) {
            return SUBLIST;
        }
    }

    return UNEQUAL;
}