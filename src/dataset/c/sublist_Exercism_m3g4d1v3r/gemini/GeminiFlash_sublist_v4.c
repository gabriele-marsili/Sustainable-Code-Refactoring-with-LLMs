#include "sublist.h"

comparison_result_t check_lists(int *list_a, int *list_b, size_t len_a,
                                size_t len_b) {
    if (len_a == 0 && len_b == 0) return EQUAL;
    if (len_a == 0) return SUBLIST;
    if (len_b == 0) return SUPERLIST;

    if (len_a == len_b) {
        for (size_t i = 0; i < len_a; ++i) {
            if (list_a[i] != list_b[i]) return UNEQUAL;
        }
        return EQUAL;
    }

    comparison_result_t result;
    int *shorter, *longer;
    size_t shorter_len, longer_len;

    if (len_a < len_b) {
        result = SUBLIST;
        shorter = list_a;
        shorter_len = len_a;
        longer = list_b;
        longer_len = len_b;
    } else {
        result = SUPERLIST;
        shorter = list_b;
        shorter_len = len_b;
        longer = list_a;
        longer_len = len_a;
    }

    for (size_t i = 0; i <= longer_len - shorter_len; ++i) {
        size_t j;
        for (j = 0; j < shorter_len; ++j) {
            if (longer[i + j] != shorter[j]) {
                break;
            }
        }
        if (j == shorter_len) {
            return result;
        }
    }

    return UNEQUAL;
}