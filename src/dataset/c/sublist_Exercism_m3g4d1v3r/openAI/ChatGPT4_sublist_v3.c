#include "sublist.h"

comparison_result_t check_lists(int *list_a, int *list_b, size_t len_a,
                                size_t len_b) {
    if (len_a == 0 && len_b == 0) return EQUAL;
    if (len_a == 0) return SUBLIST;
    if (len_b == 0) return SUPERLIST;

    if (len_a == len_b) {
        for (size_t idx = 0; idx < len_a; idx++) {
            if (list_a[idx] != list_b[idx]) return UNEQUAL;
        }
        return EQUAL;
    }

    int *big_list = (len_a > len_b) ? list_a : list_b;
    int *sml_list = (len_a > len_b) ? list_b : list_a;
    size_t big_len = (len_a > len_b) ? len_a : len_b;
    size_t sml_len = (len_a > len_b) ? len_b : len_a;
    comparison_result_t target_result = (len_a > len_b) ? SUPERLIST : SUBLIST;

    for (size_t idx = 0; idx <= big_len - sml_len; idx++) {
        size_t aux_idx = 0;
        while (aux_idx < sml_len && big_list[idx + aux_idx] == sml_list[aux_idx]) {
            aux_idx++;
        }
        if (aux_idx == sml_len) return target_result;
    }

    return UNEQUAL;
}