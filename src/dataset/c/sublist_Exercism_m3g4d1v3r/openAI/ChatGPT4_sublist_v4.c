#include "sublist.h"

comparison_result_t check_lists(int *list_a, int *list_b, size_t len_a,
                                size_t len_b) {
    if (len_a == 0 && len_b == 0) return EQUAL;
    if (len_a == 0) return SUBLIST;
    if (len_b == 0) return SUPERLIST;

    if (len_a == len_b) {
        if (memcmp(list_a, list_b, len_a * sizeof(int)) == 0) return EQUAL;
        return UNEQUAL;
    }

    int *big_list = len_a > len_b ? list_a : list_b;
    int *sml_list = len_a > len_b ? list_b : list_a;
    size_t big_len = len_a > len_b ? len_a : len_b;
    size_t sml_len = len_a > len_b ? len_b : len_a;
    comparison_result_t target_result = len_a > len_b ? SUPERLIST : SUBLIST;

    for (size_t idx = 0; idx <= big_len - sml_len; idx++) {
        if (memcmp(&big_list[idx], sml_list, sml_len * sizeof(int)) == 0) {
            return target_result;
        }
    }
    return UNEQUAL;
}